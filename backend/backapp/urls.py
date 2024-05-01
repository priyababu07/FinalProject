from django.urls import path
from .views import (
    MachineListCreateView,
    MachineDetailView,
    MachinePowerHistoryListCreateView,
    MachinePowerHistoryDetailView,
    automaticView,
    HistoryModelViewSet,
    dataret,
    schedule_machines_view,signin,signup,automatic_scheduling
)

urlpatterns = [
    path('machines/', MachineListCreateView.as_view(), name='machine-list-create'),
    path('machines/<int:pk>/', MachineDetailView.as_view(), name='machine-detail'),

    path('machine-power-history/', MachinePowerHistoryListCreateView.as_view(), name='machine-power-history-list-create'),
    path('machine-power-history/<int:pk>/', MachinePowerHistoryDetailView.as_view(), name='machine-power-history-detail'),

    path('monthly-usage-report/', HistoryModelViewSet.as_view(), name='monthly_usage_report'),  # Fixed
    path('automatic/', automaticView, name='automatic'),
    path('ret/',dataret,name='datareturn'),
    path('schedule-machines/', schedule_machines_view, name='schedule_machines'),
    path('signin/', signin, name='signin'),
    path('signup/', signup, name='signup'),
     path('automatic-scheduling/', automatic_scheduling, name='automatic_scheduling'),
]
