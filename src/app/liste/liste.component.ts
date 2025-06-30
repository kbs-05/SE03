import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-liste-etudiants',
  standalone: false,
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class LISTEComponent implements OnInit {
  departements: any[] = [];
  niveaux: any[] = [];
  filieres: any[] = [];
  etudiants: any[] = [];

  selectedDepartement: string = '';
  selectedNiveau: string = '';
  selectedFiliere: string = '';

  isLoading: boolean = false;

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    this.isLoading = true;
    await this.loadDepartements();
    this.isLoading = false;
  }

  async loadDepartements() {
    const departementRef = collection(this.firestore, 'departements');
    const snapshot = await getDocs(departementRef);
    this.departements = snapshot.docs.map(doc => ({ id: doc.id }));
    console.log('Départements chargés :', this.departements);
  }

  async selectDepartement(deptId: string) {
    this.isLoading = true;
    this.selectedDepartement = deptId;
    this.niveaux = [];
    this.filieres = [];
    this.etudiants = [];
    this.selectedNiveau = '';
    this.selectedFiliere = '';

    const niveauRef = collection(this.firestore, 'departements', deptId, 'niveaux');
    const snapshot = await getDocs(niveauRef);
    this.niveaux = snapshot.docs.map(doc => ({ id: doc.id }));
    console.log(`Niveaux chargés pour ${deptId} :`, this.niveaux);
    this.isLoading = false;
  }

  async selectNiveau(niveauId: string) {
    this.isLoading = true;
    this.selectedNiveau = niveauId;
    this.filieres = [];
    this.etudiants = [];
    this.selectedFiliere = '';

    const filiereRef = collection(
      this.firestore,
      'departements',
      this.selectedDepartement,
      'niveaux',
      this.selectedNiveau,
      'filieres'
    );
    const snapshot = await getDocs(filiereRef);
    this.filieres = snapshot.docs.map(doc => ({ id: doc.id }));
    console.log(`Filières chargées pour ${this.selectedNiveau} :`, this.filieres);
    this.isLoading = false;
  }

  async selectFiliere(filiereId: string) {
    this.isLoading = true;
    this.selectedFiliere = filiereId;
    this.etudiants = [];

    const etudiantRef = collection(
      this.firestore,
      'departements',
      this.selectedDepartement,
      'niveaux',
      this.selectedNiveau,
      'filieres',
      this.selectedFiliere,
      'etudiants'
    );
    const snapshot = await getDocs(etudiantRef);
    this.etudiants = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      .sort((a: any, b: any) => a.lastName.localeCompare(b.lastName));
    console.log(`Étudiants chargés pour ${this.selectedFiliere} :`, this.etudiants);
    this.isLoading = false;
  }

  resetToDepartments() {
    this.selectedDepartement = '';
    this.selectedNiveau = '';
    this.selectedFiliere = '';
    this.niveaux = [];
    this.filieres = [];
    this.etudiants = [];
  }

  resetToLevels() {
    this.selectedNiveau = '';
    this.selectedFiliere = '';
    this.filieres = [];
    this.etudiants = [];
  }

  resetToFields() {
    this.selectedFiliere = '';
    this.etudiants = [];
  }
}
