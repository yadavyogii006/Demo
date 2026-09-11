from fastapi import FastAPI

app = FastAPI(title="Android FastAPI Server")


@app.get("/")
def root():
    return {
        "message": "FastAPI server is running on Android!"
    }


@app.get("/health")
def health():
    return {
        "status": "ok"
    }


@app.get("/hello/{name}")
def hello(name: str):
    return {
        "message": f"Hello, {name}!"
    }