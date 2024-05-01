#  integrating machine model
# ml_model.py

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.svm import SVR
from sklearn.preprocessing import OneHotEncoder
from sklearn.metrics import mean_squared_error, mean_absolute_error
from backapp.models  import automatic

def load_data_from_db():
    """
    Load data from the Django model and convert it to a DataFrame.
    """
    # Get all records from the Machine model
    machines = automatic.objects.all()

    # Convert to DataFrame
    data = {
        'Machine ID': [machine.machine_id for machine in machines],
        'Useful Output': [machine.useful_output for machine in machines],
        'Power Consumed': [machine.power_consumed for machine in machines],
        'Efficiency': [machine.efficiency for machine in machines],
        'Peak Time Category': [machine.peak_time_category for machine in machines]
    }

    df = pd.DataFrame(data)
    print(df)
    return df

def preprocess_data(df):
    """
    Preprocess the dataset for model training and prediction.
    """
    X_efficiency = df[['Useful Output', 'Power Consumed']]
    y_efficiency = (df['Useful Output'] / df['Power Consumed']) * 100

    X_scheduling = df[['Useful Output', 'Efficiency', 'Peak Time Category']]
    encoder = OneHotEncoder()
    peak_time_encoded = encoder.fit_transform(df[['Peak Time Category']])
    peak_time_encoded_df = pd.DataFrame(peak_time_encoded.toarray(), columns=encoder.get_feature_names_out(['Peak Time Category']))
    X_encoded = pd.concat([X_scheduling.drop(columns=['Peak Time Category']), peak_time_encoded_df], axis=1)

    return X_encoded, y_efficiency

def train_model(X, y):
    """
    Train the machine learning model for efficiency prediction.
    """
    efficiency_model = SVR()
    efficiency_model.fit(X, y)
    return efficiency_model

def evaluate_model(model, X, y):
    """
    Evaluate the trained model.
    """
    y_pred = model.predict(X)
    mse = mean_squared_error(y, y_pred)
    mae = mean_absolute_error(y, y_pred)
    return mse, mae

def schedule_machines(df, production_requirements, time_slots):
    """
    Schedule machines based on available time slots and production requirements.
    """
    df['Predicted Efficiency'] = df['Efficiency']  # Assuming the efficiency prediction has already been done
    df_sorted = df.sort_values(by=['Peak Time Category', 'Predicted Efficiency'], ascending=[True, False])

    # Initialize scheduled_machines with the unique values of Peak Time Category
    scheduled_machines = {category: {'machines': [], 'time': [], 'efficiency': [], 'useful_output': [], 'total_useful_output': 0} for category in df['Peak Time Category'].unique()}

    for _, row in df_sorted.iterrows():
        time_slot = row['Peak Time Category']
        machine_id = row['Machine ID']
        print(f"Checking machine {machine_id} for time slot {time_slot}")

        if scheduled_machines[time_slot]['total_useful_output'] + row['Useful Output'] <= production_requirements.get(time_slot, 0):
            print(f"Useful Output ({row['Useful Output']}) does not exceed production requirements ({production_requirements.get(time_slot, 0)}) for time slot {time_slot}")
            available_time_slots = [slot for slot in time_slots.get(time_slot, []) if slot not in scheduled_machines[time_slot]['time']]
            if available_time_slots:
                print(f"Available time slots for {time_slot}: {available_time_slots}")
                scheduled_machines[time_slot]['machines'].append(machine_id)
                scheduled_machines[time_slot]['time'].append(available_time_slots[0])
                scheduled_machines[time_slot]['efficiency'].append(row['Predicted Efficiency'])
                scheduled_machines[time_slot]['useful_output'].append(row['Useful Output'])
                scheduled_machines[time_slot]['total_useful_output'] += row['Useful Output']
                for _, next_row in df_sorted.iterrows():
                    next_machine_id = next_row['Machine ID']
                    if next_row['Peak Time Category'] == time_slot and next_machine_id != machine_id and \
                            scheduled_machines[time_slot]['total_useful_output'] + next_row['Useful Output'] <= production_requirements.get(time_slot, 0):
                        scheduled_machines[time_slot]['machines'].append(next_machine_id)
                        scheduled_machines[time_slot]['time'].append(available_time_slots[0])
                        scheduled_machines[time_slot]['efficiency'].append(next_row['Predicted Efficiency'])
                        scheduled_machines[time_slot]['useful_output'].append(next_row['Useful Output'])
                        scheduled_machines[time_slot]['total_useful_output'] += next_row['Useful Output']
            else:
                print(f"No available time slots for time slot {time_slot}")
        else:
            print(f"Useful Output ({row['Useful Output']}) exceeds production requirements ({production_requirements.get(time_slot, 0)}) for time slot {time_slot}")

    return scheduled_machines