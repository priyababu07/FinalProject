# # backapp/machinedata.py
# import os
# import django
# import time
# import serial

# # django.setup()  
# from backapp.models import dummy_data

# # Set up Django
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings.settings')


# # Set up serial communication with the Arduino
# arduino_port = '/dev/ttyACM0'  # Adjust this to your serial port
# arduino_baudrate = 9600  # Arduino baud rate
# arduino_data = serial.Serial(arduino_port, arduino_baudrate)
# time.sleep(1)  # Allow some time for the serial port to initialize

# # Loop to continuously read from the Arduino
# while True:
#     # Wait until data is available on the serial port
#     while arduino_data.inWaiting() == 0:
#         pass  # Busy-waiting until data is available

#     # Read and process the incoming data
#     data_packet = arduino_data.readline().decode('utf-8').strip().split(',')
    
#     # Unpack the data packet into expected variables
#     (
        
#         current,
#         voltage,
#         power
        
#     ) = data_packet
    
#     # Convert necessary data to appropriate types
    
#     current = int(current)  # Convert to float for current
#     voltage = int(voltage)  # Convert to float for voltage
#     power = int(power)  # Convert to float for power consumed
    

#     # Save the data to the database
#     dummy_data.objects.create(
        
#         current=current,
#         voltage=voltage,
#         power=power
#         # Assuming this is a comma-separated string
#     )

#     # Delay before reading the next data packet
#     time.sleep(1)  # Wait for 1 second before repeating



# Example usage in another file (e.g., some_other_file.py)
from dummy_data import read_arduino_data

data = read_arduino_data()

if data:
    # Process the data (e.g., print, visualize, send to another system)
    print(f"Received data: {data}")

    # You can now insert the data into your database using Django ORM
    # (assuming you have a model defined and Django setup)
    # ...
else:
    print("No data received from Arduino")