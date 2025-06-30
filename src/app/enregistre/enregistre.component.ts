import { Component } from '@angular/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enregistre',
  standalone: false,
  templateUrl: './enregistre.component.html',
  styleUrl: './enregistre.component.css'
})
export class ENREGISTREComponent {
  student = {
    lastName: '',
    firstName: '',
    matricule: '',
    department: '',
    level: '',
    field: ''
  };
  isLoading: boolean = false;
  qrCodeUrl: string = '';

  constructor(private firestore: Firestore, private router: Router) {}

  async onSubmit() {
    this.isLoading = true;

    const studentData = {
      lastName: this.student.lastName,
      firstName: this.student.firstName,
      matricule: this.student.matricule,
      department: this.student.department,
      level: this.student.level,
      field: this.student.field
    };

    try {
      // 🔹 1. Enregistrement de l'étudiant
      const studentRef = doc(
        this.firestore,
        'departements',
        this.student.department,
        'niveaux',
        this.student.level,
        'filieres',
        this.student.field || 'General',
        'etudiants',
        `${this.student.lastName}_${this.student.firstName}`
      );

      await setDoc(studentRef, studentData);

      // 🔹 2. S'assurer que les documents parents ne sont pas vides
      const departementRef = doc(this.firestore, 'departements', this.student.department);
      await setDoc(departementRef, { nom: this.student.department }, { merge: true });

      const niveauRef = doc(this.firestore, 'departements', this.student.department, 'niveaux', this.student.level);
      await setDoc(niveauRef, { nom: this.student.level }, { merge: true });

      const filiereRef = doc(this.firestore, 'departements', this.student.department, 'niveaux', this.student.level, 'filieres', this.student.field || 'General');
      await setDoc(filiereRef, { nom: this.student.field || 'General' }, { merge: true });

      // 🔹 3. Génération du lien QR Code
      const encoded = btoa(JSON.stringify(studentData));
      this.qrCodeUrl = `https://se-03-kbs1.vercel.app/affiche/${encoded}`;

      console.log("✅ Étudiant enregistré avec succès !");
      console.log("QR Code :", this.qrCodeUrl);
    } catch (error) {
      console.error('❌ Erreur lors de l’enregistrement de l’étudiant :', error);
    } finally {
      this.isLoading = false;
    }
  }
}
