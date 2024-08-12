import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";


export async function generateMetadata({params}) {
    const character = await getData(params.id);
    return {
        title: character.name + ' - character'
    };
}

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
        <main className="flex flex-col items-center justify-between p-24">
            <section>
                <div className="flex justify-center">
                    <div className="max-w-3xl">
                        <div className="m-4 block rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-800 dark:shadow-black/20">        
                            <div className="md:flex md:flex-row">
                                <div className="mx-auto mb-6 flex w-36 items-center justify-center md:mx-0 md:w-96 lg:mb-0">                                
                                    <Image src={character.image} width={250} height={250} alt={character.name} title={character.name} className="rounded-full shadow-md dark:shadow-black/30" />
                                </div>
                                <div className="md:ms-6">
                                    <p className="mb-6 text-xl font-semibold text-neutral-800 dark:text-neutral-200">Name: {character.name}</p>
                                    <p className="mb-6 font-semibold text-neutral-500 dark:text-neutral-300">Species: {character.species}</p>                                
                                    <p className="mb-6 font-semibold text-neutral-500 dark:text-neutral-300">Gender: {character.gender}</p>  
                                    <p className="mb-6 font-semibold text-neutral-500 dark:text-neutral-400">Current state: {character.status}</p>
                                    <p className="mb-6 font-semibold text-neutral-500 dark:text-neutral-400">Origin: {character.origin.name}</p>
                                </div>
                            </div>
                        </div>
                        <div><Link href={'/'}>&laquo; Back</Link></div>
                    </div>
                </div>
            </section>
        </main>
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