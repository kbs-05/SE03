import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, doc } from '@angular/fire/firestore';

@Component({
  selector: 'app-liste',
  standalone: false,
  templateUrl: './liste.component.html',
  styleUrl: './liste.component.css'
})
export class LISTEComponent implements OnInit {
  departments: string[] = [];
  levels: string[] = [];
  fields: string[] = [];
  students: any[] = [];

  selectedDepartment: string | null = null;
  selectedLevel: string | null = null;
  selectedField: string | null = null;
  selectedStudent: any = null;

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    try {
      // Récupérer manuellement les noms des collections racines connues
      this.departments = [
        'BUSINESS SCHOOL',
        "ECOLE D'INGENIEUR DE LIBREVILLE",
        "ECOLE DE SANTE DE LIBREVILLE",
        "INSTITUT D'ETUDES JURIDIQUES ET SCIENCE POLITIQUE",
        "INSTITUT PHILIPPE MAURY DE L'AUDIOVISUEL ET DU CINEMA",
        "INSTITUT D'AGRONOMIE ET DE SECURITE ALIMENTAIRE",
        "INSTITUT DE JOURNALISME ET DE COMMUNICATION DE LIBREVILLE"
      ];
    } catch (error) {
      console.error('Erreur lors de la récupération des composantes :', error);
    }
  }

  async selectDepartment(dept: string) {
    this.selectedDepartment = dept;
    this.selectedLevel = null;
    this.selectedField = null;
    this.students = [];
    try {
      const levelsSnap = await getDocs(collection(this.firestore, dept));
      this.levels = levelsSnap.docs.map(doc => doc.id);
    } catch (error) {
      console.error('Erreur lors de la récupération des niveaux :', error);
    }
  }

  async selectLevel(level: string) {
    this.selectedLevel = level;
    this.selectedField = null;
    this.students = [];
    try {
      const fieldsSnap = await getDocs(collection(this.firestore, `${this.selectedDepartment}/${level}`));
      this.fields = fieldsSnap.docs.map(doc => doc.id);
    } catch (error) {
      console.error('Erreur lors de la récupération des filières :', error);
    }
  }

  async selectField(field: string) {
    this.selectedField = field;
    try {
      const studentsSnap = await getDocs(collection(this.firestore, `${this.selectedDepartment}/${this.selectedLevel}/${this.selectedField}`));
      this.students = studentsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Erreur lors de la récupération des étudiants :', error);
    }
  }

  resetToDepartments() {
    this.selectedDepartment = null;
    this.selectedLevel = null;
    this.selectedField = null;
    this.students = [];
  }

  resetToLevels() {
    this.selectedLevel = null;
    this.selectedField = null;
    this.students = [];
  }

  resetToFields() {
    this.selectedField = null;
    this.students = [];
  }

  openModal(student: any) {
    this.selectedStudent = student;
    const modal = new (window as any).bootstrap.Modal(document.getElementById('studentModal'));
    modal.show();
  }
}
