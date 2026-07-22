import { useParams } from "react-router-dom";

export default function ProductList() {

    const { id } = useParams();

    return (

        <div className="max-w-6xl mx-auto py-20">

            <h1 className="text-5xl font-bold">
                Product Details
            </h1>

            <p className="mt-8 text-xl">
                Product ID : {id}
            </p>

        </div>

    );
}