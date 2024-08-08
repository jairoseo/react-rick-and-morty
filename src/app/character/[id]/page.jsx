import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams(){
    const characters = await fetch("https://rickandmortyapi.com/api/character").then((res) => res.json());
    return characters.results.map((character) => (
        {id: String(character.id)}
    ))
}

export default async function Page({params}){

    const character = await getData(params.id);
    if(!character) notFound();

    return (
        <div>
            <h1>{character.name}</h1>
            <p><Image src={character.image} width={150} height={150} alt={character.name} title={character.name} /></p>
            <p>{character.status}</p>
            <p>{character.species}</p>
        </div>
    )
}

async function getData(id){
    try {
        const res = await fetch("https://rickandmortyapi.com/api/character/"+id);
        if(!res.ok) throw new Error("Error al conectar al api");
        return await res.json();
    } catch (error) {
        console.error(error);
        return null; 
    }
}