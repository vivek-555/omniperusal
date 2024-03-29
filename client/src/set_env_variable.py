import os

os.environ["PYTHONUNBUFFERED"]="true"
os.environ["NODE_ENV"]="development"
os.environ["GUNICORN_PARAMS"]="-c gunicorn.cfg"
os.environ["DATABASE_URL"]="postgresql://localhost"
