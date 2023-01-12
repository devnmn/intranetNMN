export interface elementoLista {
    contenido: string;
    estatus: boolean;
  }
  
export interface acumuladorTiempoString {
    hora: string;
    minuto: string;
    segundo: string;
  }

export interface acumuladorTiempo {
  resHor: any;
  resMin: any;
  resSeg: any;
}

export interface acumuladorTiempoNumber {
    hora: number;
    minuto: number;
    segundo: number;
  }

  export interface autor {
    id: string;
    name: string;
  }

  export interface colaborador {
    id: string;
    name: string;
  }

  export interface cliente {
    id: string;
    razon_social: string;
  }

  export interface proyecto {
    id: string;
    nombre: string;
  }
  
export  interface registroActividad {
  
    idActividad: number;
    nombre: string;
    prioridadAlta: boolean;
    autor: autor[],
    colaboradorAsignado: colaborador[],
    cliente: cliente[];
    proyecto: proyecto[];
    fecha: any;
    dia: number;
    tiempoInicio: any; //timestamp
    tiempoFinal: any;
    tiempoActual?: number;
    descripcion?: string;
    mes?: number;
    anio?: number;
    semana?: number;
    lista: elementoLista[];
    tiempoAcumulado: acumuladorTiempoString;
  
  }
  