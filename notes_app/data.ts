export interface Note {
    _id:string;
    title:string;
    created_on:string;
    preview:string;
    userId:string | null;

}


interface NoteData {
    id:number;
    data:string;
}


// export const noteslist: Note[] = [
//     {
//         preview_id: 1,
//         title:"Note 1",
//         created_on:"13-02-2024",
//         preview:"Hello world , this is a ....."

//     },
//     {
//         preview_id: 2,
//         title:"Note 2",
//         created_on:"13-02-2024",
//         preview:"My Name is Harigovind"

//     },
//     {
//         preview_id: 3,
//         title:"Note 3",
//         created_on:"13-02-2024",
//         preview:"I am a React dev .... "

//     }


export const note_data: NoteData[] =[
    {
        id: 1,
        data: "This is a smample data in note 1 "
    },
    {
        id: 1,
        data: "This is a smample data in note 1 "
    },
    {
        id: 1,
        data: "This is a smample data in note 1 "
    }
]