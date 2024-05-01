from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from backapp.models import  machine_data # Related models from your app (optional)
import os  # For accessing environment variables (recommended for production)
import joblib 
import time
import serial
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from ml_model import  preprocess_data, schedule_machines,load_data_from_db
from django.core.exceptions import ObjectDoesNotExist
from django.utils import timezone
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

import json
# from django.contrib.auth import authenticate
from django.contrib.auth.models import User
import numpy as np
from rest_framework import generics,viewsets
from .models import Machine, MachinePowerHistory,automatic,automaticHistory,User
from .serializers import MachineSerializer, MachinePowerHistorySerializer,automaticSerializer,autoHistorySerializer
import pandas as pd

def load_data(file_path):
    return pd.read_excel(file_path)

class MachineListCreateView(generics.ListCreateAPIView):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer

class MachineDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer

class MachinePowerHistoryListCreateView(generics.ListCreateAPIView):
    queryset = MachinePowerHistory.objects.all()
    serializer_class = MachinePowerHistorySerializer

class MachinePowerHistoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MachinePowerHistory.objects.all()
    serializer_class = MachinePowerHistorySerializer


    

# def automaticView(request):
#     # Initialize the Serial connection
#     ser = serial.Serial('/dev/ttyACM0', baudrate=115200)  # Check the port and baudrate
#     try:
#         # Read data from the Serial connection
#         line = ser.readline().decode('utf-8')  # Decode the byte stream to string
        
#         # Split the string to extract data fields
#         values = line.split(',')

#         # Ensure there are at least 3 elements in 'values'
#         if len(values) < 3:
#             return JsonResponse({'error': 'Unexpected data format'}, status=400)

#         # Extracting the power value, ensuring it's a valid float
#         # Assuming the third element contains "Power: x.xx"
#         power_str = values[2].strip()  # Remove any extra spaces
#         power_value = power_str.split(':')[-1].strip()  # Get the float part

#         # Try to convert to float
#         power = float(power_value)

#         # Return the parsed data as a response
#         return JsonResponse({
#             'machine_id': values[0],  # First element, typically machine ID
#             'power': power,  # Extracted power value
            
#         })

#     except serial.SerialException as e:
#         # Handle Serial exceptions (e.g., connection issues)
#         return JsonResponse({'error': f'Serial error: {str(e)}'}, status=500)

#     except ValueError as e:
#         # Handle errors related to float conversion
#         return JsonResponse({'error': f'Value error: {str(e)}'}, status=400)

#     finally:
#         # Close the Serial connection
#         if ser.is_open:
#             ser.close()

# from django.http import JsonResponse
# import serial
# from backapp.models import automatic, automaticHistory

# Global variable to track the previous slot
previous_slot = None

def automaticView(request):
    global previous_slot

    # Configure the serial port
    ser = serial.Serial('/dev/ttyACM0', 115200)  # Update with your serial port

    while True:
        # Read data from the serial port
        line = ser.readline().decode('latin-1').strip()
        values = line.split(',')

        if len(values) == 5:
            peak_time_category = int(values[0])
            machine_id = str(values[1])
            power_consumed = float(values[2])
            efficiency = float(values[3])
            useful_output = float(values[4])
            print(peak_time_category);
            print(machine_id)
            print(power_consumed)
            print(efficiency)
            print(useful_output)

            if peak_time_category != previous_slot:
                # Slot has changed
                if previous_slot is not None:
                    # Move all previous slot entries to history
                    existing_entries = automatic.objects.filter(peak_time_category=previous_slot)
                    for entry in existing_entries:
                        automaticHistory.objects.create(
                            peak_time_category=entry.peak_time_category,
                            machine_id=entry.machine_id,
                            power_consumed=entry.power_consumed,
                            efficiency = entry.efficiency,
                            useful_output = entry.useful_output,
                        )
                        entry.delete()  # Clear the current table

                # Update the previous_slot to the new slot
                previous_slot = peak_time_category

            # Insert the new data into the current table
            automatic.objects.create(peak_time_category=peak_time_category, machine_id=machine_id, power_consumed=power_consumed,efficiency=efficiency,useful_output=useful_output)
        
        else:
            print("Invalid data received from Arduino")  # Handle unexpected data





class HistoryModelViewSet(generics.ListCreateAPIView):
    queryset = automaticHistory.objects.all()
    serializer_class = autoHistorySerializer

def dataret(request):
    alldata = list(automaticHistory.objects.order_by('id')[:5].values('power_consumed'))   #return the voltage form the database
    return JsonResponse(alldata,safe=False)

#model
# def load_data(file_path):
#     return pd.read_excel('./machine_data (7).xlsx')
def schedule_machines_view(request):
    # Load data from the Django database
    df = load_data_from_db()

    # Preprocess data
    X_encoded, _ = preprocess_data(df)  # We don't need y_efficiency for scheduling

    # Define time slots and production requirements
    time_slots = {
        '1': ['9.00 AM', '10.00 AM', '11.00 AM', '12.00 PM', '1.00 PM', '2.00 PM', '3.00 PM', '4.00 PM', '5.00 PM', '6.00 PM'],
        '2': ['6.00 PM', '7.00 PM', '8.00 PM', '9.00 PM', '10.00 PM'],
        '3': ['10.00 PM', '11.00 PM', '12.00 AM', '1.00 AM', '2.00 AM', '3.00 AM', '4.00 AM', '5.00 AM', '6.00 AM']
    }

    production_requirements = {
        '1': 1000,  # Adjusted to be more in line with the data
        '2': 1000,
        '3': 1000
    }

    # Schedule machines
    scheduled_machines = schedule_machines(df, production_requirements, time_slots)

    # Print the scheduled machines to the terminal
    for time_slot, data in scheduled_machines.items():
        print(f"Machines scheduled in {time_slot} slot:")
        print("Machine IDs:", data['machines'])
        print("Scheduled Time:", data['time'])
        print("Efficiency:", data['efficiency'])
        print("Useful Output:", data['useful_output'])
        print("Total Useful Output:", data['total_useful_output'])
        print()

    return HttpResponse("Schedule printed in the terminal.")






# csrf_exempt
# def store_machine_data_view(request):
#     if request.method == 'POST':
#         # Handle the incoming data and store it in your database
#         # You can access the data using request.POST or request.body

#         # Example response
#         return JsonResponse({'status': 'Data stored successfully'})
#     else:
#         return JsonResponse({'status': 'Invalid request method'}, status=405)
#     MODEL_PATH = '/backend/model.pk1'
# # CSRF-exempt view to predict efficiency using a pre-trained model
# @csrf_exempt
# def predict_efficiency(request):
#     if request.method == 'POST':
#         try:
#             # Load the SVR model
#             model = joblib.load('/backend/model.pk1')
#         except FileNotFoundError:
#             return JsonResponse({'error': 'Model file not found'}, status=404)

#         try:
#             # Get data from the POST request
#             machine_id = int(request.POST.get('machine_id'))  # Get the machine ID from the POST data
#             machine_data = MachineData.objects.get(pk=machine_id)  # Fetch the machine from PostgreSQL


#             # Create input data for prediction (SVR expects 2D array)
#             input_data = np.array([[MachineData.useful_output, MachineData.power_consumed]])

#             # Make prediction
#             predicted_efficiency = model.predict(input_data)[0]

#             return JsonResponse({
#                 'machine_id': machine_id,
#                 'predicted_efficiency': predicted_efficiency,
#             })
#         except ObjectDoesNotExist:
#             return JsonResponse({'error': 'Machine not found'}, status=404)
#         except ValueError:
#             return JsonResponse({'error': 'Invalid data'}, status=400)
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=405)

# # Store machine data
# @csrf_exempt
# def store_machine_data(request):
#     if request.method == 'POST':
#         try:
#             # Retrieve POST data and validate
#             machine_id = int(request.POST.get('machine_id'))
#             useful_output = float(request.POST.get('useful_output'))
#             power_consumed = float(request.POST.get('power_consumed'))

#             # Update machine data or create a new machine
#             machine, created = Machine.objects.get_or_create(
#                 pk=machine_id,
#                 defaults={
#                     'useful_output': useful_output,
#                     'power_consumed': power_consumed,
#                 }
#             )

#             if not created:
#                 machine.useful_output = useful_output
#                 machine.power_consumed = power_consumed
#                 machine.save()

#             return JsonResponse({
#                 'status': 'Data stored successfully',
#                 'machine_id': machine_id,
#             })
#         except Exception as e:
#             return JsonResponse({'error': str(e)}, status=400)
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=405)


###### Login in and sign up view



# SALT = bcrypt.gensalt(10)


@csrf_exempt
def signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        if name and email and password:
            try:
                # Hash the password
                hashed_password = make_password(password)

                # Create a new user
                user = User.objects.create_user(email=email, password=hashed_password)
                user.name = name  
                user.email = email 
                user.password = hashed_password 
                user.last_login = timezone.now()  
                user.save()
                return JsonResponse({'success': True, 'message': 'User signed up successfully'})
            except Exception as e:
                return JsonResponse({'success': False, 'message': str(e)}, status=400)
        else:
            return JsonResponse({'success': False, 'message': 'Name, email, or password not provided'}),

                                
@csrf_exempt
def signin(request):
    if request.method == 'POST':  # Expect POST request
        # Parse the JSON body
        data = json.loads(request.body)  # Parse the request body
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return JsonResponse({'success': False, 'message': 'Email and password are required'}, status=400)

        try:
            # Get user by email
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Invalid email or password'}, status=401)

        # Check password
        if check_password(password, user.password):
            # Authentication successful
            return JsonResponse({'success': True, 'message': 'User signed in successfully'})
        else:
            # Authentication failed
            return JsonResponse({'success': False, 'message': 'Invalid email or password'}, status=401)
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method'}, status=405) 
     # Correct status code for invalid method


     #Automatic Scheduling:


def automatic_scheduling(request):
    machines = automatic.objects.all()

    output = ''
    for machine in machines:
        if machine.peak_time_category == 1:
            if machine.machine_id == 'Machine_1':
                output += f"Machine ID: {machine.machine_id}\n"
                output += f"Power Consumed: {machine.power_consumed}\n"
                output += f"Efficiency: {machine.efficiency}\n\n"
        elif machine.peak_time_category in [2, 3]:
            output += f"Machine ID: {machine.machine_id}\n"
            output += f"Power Consumed: {machine.power_consumed}\n"
            output += f"Efficiency: {machine.efficiency}\n\n"

    if output:
        return HttpResponse(output, content_type='text/plain')
    else:
        return HttpResponse("No machines found.", content_type='text/plain')