import os
import time
import serial

def read_arduino_data():
    """Reads data from Arduino and returns a list of voltage, current, power."""

    arduino_port = '/dev/ttyACM0'  # Adjust this to your serial port
    arduino_baudrate = 9600

    try:
        arduino_data = serial.Serial(arduino_port, arduino_baudrate)
        time.sleep(1)  # Allow some time for the serial port to initialize

        while True:
            # Wait until data is available on the serial port
            while arduino_data.inWaiting() == 0:
                pass

            # Read and process the incoming data
            data_packet = arduino_data.readline().decode('utf-8').strip().split(',')

            # Check that the packet has three items
            if len(data_packet) == 3:
                # Unpack the data into expected variables
                voltage, current, power = map(int, data_packet)

                # Return the data as a list
                return [voltage, current, power]
            else:
                print("Received data does not have the expected number of values.")

    except Exception as e:
        print(f"Error reading data: {e}")

    finally:
        # Close the serial connection
        arduino_data.close()
