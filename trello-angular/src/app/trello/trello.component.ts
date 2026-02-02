import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-trello',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  providers: [DatePipe], // <-- agregar aquí
  templateUrl: './trello.component.html',
  styleUrls: ['./trello.component.css']
})
export class TrelloComponent implements OnInit {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}
  
  formatDate(fecha: string) {
    return this.datePipe.transform(fecha, 'dd/MM/yyyy'); // cambia el formato aquí
  }

  api = 'http://localhost:3000/tareas';

  pendiente:any[] = [];
  proceso:any[] = [];
  terminada:any[] = [];

  mostrarPanel = false;
  modoEdicion = false;

  tareaActual:any = {
    id:null,
    titulo:'',
    descripcion:'',
    imagen_url:'',
    enlace:'',
    fecha_limite:'',
    prioridad:'media',
    estado:'pendiente'
  };

  ngOnInit(){
    this.cargarTareas();
  }

  cargarTareas(){
    this.http.get<any[]>(this.api).subscribe(data=>{
      this.pendiente = data.filter(t=>t.estado=='pendiente');
      this.proceso   = data.filter(t=>t.estado=='proceso');
      this.terminada = data.filter(t=>t.estado=='terminada');
    });
  }

  abrirPanel(estado:string){
    this.modoEdicion = false;
    this.tareaActual = {
      id:null,
      titulo:'',
      descripcion:'',
      imagen_url:'',
      enlace:'',
      fecha_limite:'',
      prioridad:'baja',
      estado:estado
      
    };
    this.mostrarPanel = true;
  }

    editar(t:any){
    this.modoEdicion = true;

    this.tareaActual = {
        ...t,
        fecha_limite: t.fecha_limite ? t.fecha_limite.split('T')[0] : ''
    };

    this.mostrarPanel = true;
    }

 guardar(){
  if(this.modoEdicion){
    this.http.put(this.api+'/'+this.tareaActual.id, this.tareaActual).subscribe(()=>{
      this.cargarTareas();
      this.mostrarPanel = false;
    });
  }else{
    this.http.post(this.api, this.tareaActual).subscribe(()=>{
      this.cargarTareas();
      this.mostrarPanel = false;
    });
  }
}


  eliminar(id:number){
    this.http.delete(this.api+'/'+id).subscribe(()=>{
      this.cargarTareas();
    });
  }

    mover(event: CdkDragDrop<any[]>, estado:string){
        if (event.previousContainer === event.container) {
            return;
        }

        const tarea = event.previousContainer.data[event.previousIndex];

        this.http.put(`${this.api}/${tarea.id}/estado`, { estado }).subscribe(()=>{
            this.cargarTareas();
        });

        transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
        );
    }




  cerrarPanel(){
    this.mostrarPanel = false;
  }

  colorPrioridad(p:string){
    if(p=='alta') return 'alta';
    if(p=='media') return 'media';
    return 'baja';
  }
}
