import Header from "./Header";

export default function Layout({children}) {
    return (
    <div className="container">

        <Header />        

        <main className="ml-[0.1vw] h-full px-12 py-5">
            {children}
        </main>
    </div>
    )
} 