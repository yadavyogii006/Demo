from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Android FastAPI Server")

ALLOWED_ORIGINS = [
    "https://pocket-server.yogesh-yadav.is-a.dev",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "Accept"],
)


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
