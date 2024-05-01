# serializers.py

from rest_framework import serializers
from .models import machine_data, MachinePowerHistory,dummy_data,automatic

class MachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = machine_data
        fields = '__all__'

class MachinePowerHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MachinePowerHistory
        fields = '__all__'
class dummySerializer(serializers.ModelSerializer):
    class Meta:
        model = dummy_data
        fields = '__all__'

# class MachineDataSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = MachineData
#         fields = '__all__'
# class MachineDataSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = machine_Data
#         fields = '__all__'
class automaticSerializer(serializers.ModelSerializer):
    class Meta:
        model = automatic
        fields = '__all__'
class autoHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = automatic
        fields = '__all__'
