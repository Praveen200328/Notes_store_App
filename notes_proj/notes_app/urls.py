from django.urls import path
from .import views

urlpatterns = [
    path("notes/",views.notes,name="notes"),
    path("notes/<slug:slug>/",views.note_detail,name="note-detail"),
    path("notes-search/",views.search_notes,name="search-notes")
]



#endpoints:
#GET_ALL_NOTES_AND_CREATE_NOTE: "http://127.0.0.1:8000/notes/"
#GET_SPECIFIC_NOTE: "http://127.0.0.1:8000/notes/learn-reactjs/""
#search_Notes:"http://127.0.0.1:8000/notes-search/?search=PERSONAL"