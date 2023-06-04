import Header from "./Header";

export default function Layout({children}) {
    return (
    <div className="container">

        <Header />        

        <main className="w-full h-full px-8 py-3">
            {children}
        </main>
    </div>
    )
} 