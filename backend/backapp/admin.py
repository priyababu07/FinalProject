from django.contrib import admin
from .models import Machine, MachinePowerHistory,machine_data,automatic,automaticHistory

class MachineAdmin(admin.ModelAdmin):
    list_display = ('name', 'base_power_consumption', 'production_rate')  # Corrected
    search_fields = ('name',)  # Corrected

@admin.register(MachinePowerHistory)
class MachinePowerHistoryAdmin(admin.ModelAdmin):
    list_display = ('machine', 'timestamp', 'power_consumption', 'is_peak')
    list_filter = ('is_peak',)  # Adds a filter for is_peak
    search_fields = ('machine__name',)  # Adds a search bar for the 'machine__name' field

admin.site.register(machine_data)
admin.site.register(automatic)
admin.site.register(automaticHistory)