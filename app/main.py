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


@app.get("/api/projects")
def projects():
    return [
        {
            "name": "StudyPlan",
            "description": "A platform for tracking study group progress.",
            "tech": ["FastAPI", "React", "PostgreSQL"]
        },
        {
            "name": "DevMate",
            "description": "An AI-powered developer productivity project.",
            "tech": ["Python", "FastAPI", "AI"]
        },
        {
            "name": "Android Server",
            "description": "This portfolio running directly from an Android phone.",
            "tech": ["Android", "Termux", "FastAPI", "Uvicorn"]
        }
    ]



@app.get("/hello/{name}")
def hello(name: str):
    return {
        "message": f"Hello, {name}!"
    }
