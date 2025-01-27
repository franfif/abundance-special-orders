from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from django_apscheduler.jobstores import DjangoJobStore, register_events, register_job
from django_apscheduler.models import DjangoJobExecution
from .models import Order
import logging
from datetime import datetime, timedelta


logger = logging.getLogger(__name__)

def permanently_delete_orders():
    """
    Call `permanently_delete` on all instances of the Order model.
    """
    orders = Order.objects.filter(date_deleted__isnull=False)
    for order in orders:
        order.permanently_delete()
    print("Called permanently_delete on orders with a deletion date.")

# Initialize the scheduler and register the job
def start():
    scheduler = BackgroundScheduler()
    scheduler.add_jobstore(DjangoJobStore(), "default")

    scheduler.add_job(
        permanently_delete_orders,  # Function to run
        trigger=CronTrigger(day="*"),  # Trigger: Every day
        id="permanently_delete_orders",  # Unique job ID
        max_instances=1,  # Prevent running the job twice at the same time
        replace_existing=True,  # Replace existing job with same ID
    )
    print("Added job: permanently_delete_orders")

    # Register events to handle success/error for jobs
    register_events(scheduler)

    scheduler.start()
    print("Scheduler started!")