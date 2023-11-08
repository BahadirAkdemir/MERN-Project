import  {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {createTicket, reset} from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";


function NewTicket()
{

    const {user} = useSelector((state) => state.auth);
    const {isloading, isSuccess, isError, message} = useSelector((state) => state.ticket);

    const [name] = useState(user.name);
    const [email] = useState(user.email);
    const [product, setProduct] = useState("");
    const [description, setDescription] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(isError)
        {
            toast.error(message);
        }
        if(isSuccess)
        {
            dispatch(reset());
            navigate('/tickets');

        }
        dispatch(reset());

    }, [isError, isSuccess, message, navigate]);

    if(isloading)
    {
        return <Spinner />
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createTicket({product, description}));
    }



    return (
        <>
            <BackButton url={"/"} />
            <section className={"heading"}>
                <h1>Create New Ticket</h1>
                <p>Please fill out the form below</p>
            </section>
            <section className={"form"}>
                <div className="form-group">
                    <label htmlFor={"name"}>Customer Name</label>
                    <input type={"text"} id={"name"} value={name} disabled={true} className={'form-control'} />
                </div>
                <div className="form-group">
                    <label htmlFor={"name"}>Customer Email</label>
                    <input type={"text"} id={"email"} value={email} disabled={true} className={'form-control'} />
                </div>
                <form onSubmit={onSubmit} >
                    <div className="form-group">
                        <label htmlFor="product">Product</label>
                        <select name={"product"} id={'product'} value={product} onChange={(e) => setProduct(e.target.value)}>
                            <option value={"iPhone"}>iPhone</option>
                            <option value={"iPad"}>iPad</option>
                            <option value={"MacBook"}>Macbook</option>
                            <option value={"iMac"}>iMac</option>
                            <option value={"Apple Watch"}>Apple Watch</option>
                            <option value={"AirPods"}>Airpods</option>ü
                            <option value={"Apple TV"}>Apple TV</option>
                            <option value={"HomePod"}>HomePod</option>
                            <option value={"Beats"}>Beats</option>
                            <option value={"Accessories"}>Accessories</option>



                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea className={'form-control'} placeholder={'Description'} name={"description"} id={'description'} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="form-group">
                        <button type={"submit"} className={'btn btn-block'}>Create Ticket</button>
                    </div>
                </form>
            </section>
            <h1>New Ticket</h1>
        </>
    );
}

export default NewTicket;