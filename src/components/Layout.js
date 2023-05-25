import Header from "./Header";

export default function Layout({children}) {
    return (
    <div className="container">

        <Header />        

        <main className="h-full px-12 py-5 ">
            {children}
        </main>
    </div>
    )
} 