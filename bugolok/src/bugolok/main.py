# https://itnext.io/how-to-use-firebase-auth-with-a-custom-node-backend-99a106376c8a

from fastapi import FastAPI
from pydantic import BaseModel
import firebase_admin
from firebase_admin import credentials, app_check

cred = credentials.Certificate("ugolok-auth-firebase-adminsdk-iwmtr-8d2e35636a.json")
firebase_admin.initialize_app(cred)

app = FastAPI()


class Request(BaseModel):
    token: str


@app.get("/")
async def root(request: Request):
    try:
        return app_check.verify_token(request.token)
    except Exception as e:
        print(e)
