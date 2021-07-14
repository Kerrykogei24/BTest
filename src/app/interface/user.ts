export interface Iuser {
    username: string;
    email: string;
    password1: string;
    password2: string;
    first_name: string;
    phone_number:number;
    location:string;
    authToken:string;
    id?: number;
    results: any[];
  
}

export interface ILoginuser {
    username: string;
    password: string;
}

export interface Iresult {
    count: number;
    results: any[];
    prev: number;
    next: number;
}

export interface Ipost {
    title: string;
    description: string;
    content: string;
    id?: number;
    // pub_date:string;
}

