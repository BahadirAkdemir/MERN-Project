import {useSelector,useDispatch} from "react-redux";
import {getTicket, reset, closeTicket} from "../features/tickets/ticketSlice";
import {getNotes, reset as notesReset, addNote} from "../features/notes/noteSlice";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import Modal from "react-modal";
import {FaPlus} from "react-icons/fa";
import NoteItem from "../components/NoteItem";

const customStyles = {
    content : {
        width: '600px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative'

    }
}

Modal.setAppElement('#root');

function Ticket()
{
    const [modalIsOpen, setIsOpen] = useState(false);
    const [noteText, setNoteText] = useState('');
    const {ticket, isLoading, isError, isSuccess, message} = useSelector((state) => state.ticket);
    const {notes, isLoading: notesIsLoading} = useSelector((state) => state.note);
    const dispatch = useDispatch();
    const {ticketId} = useParams();
    const navigate = useNavigate();

    const onNoteSubmit = (e) => {
        e.preventDefault();
        dispatch(addNote({
            ticketId,
            text: noteText
        }
        ));

        setNoteText('');
        setIsOpen(false);
    }


    useEffect(() => {
        if(isError)
        {
            toast.error(message);
        }

        dispatch(getTicket(ticketId));
        dispatch(getNotes(ticketId));
    },[isError, message, ticketId])

    const onTicketClose = () => {
        dispatch(closeTicket(ticketId));
        toast.success("Ticket closed successfully");
        navigate('/tickets');
    }

    if(isLoading)
    {
        return <Spinner />
    }

    if(isError)
    {
        return <BackButton url={"/tickets"} />
    }

    return <div className={'ticket-page'}>
        <header className="ticket-header">
            <BackButton url={"/tickets"} />
            <h2>Ticket ID: {ticket._id}
            <span className={`status status-${ticket.status}`}>
                {ticket.status}
            </span></h2>
            <h3>
                Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
            </h3>
            <h3>Product: {ticket.product}</h3>
            <hr />
            <div className="ticket-desc">
                <h3>Description of Issue</h3>
                <p>{ticket.description}</p>
            </div>
        </header>

        {ticket.status !== 'closed' && (
            <button onClick={() => setIsOpen(true)} className={'btn'}><FaPlus/>Add Note</button>
        )}

        <Modal isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
            <h2>Add Note</h2>
            <button className="btn-close" onClick={() => setIsOpen(false)}>X</button>
            <form onSubmit={onNoteSubmit}>
                <div className="form-group">
                    <textarea name = "noteText" id = "noteText" className="form-control" placeholder={"Note Text"} value={noteText} onChange={(e) => setNoteText(e.target.value)}></textarea>
                </div>
                <button type="submit" className="btn btn-block btn-primary">Add Note</button>
            </form>
        </Modal>
        {notes.map((note) => (
           <NoteItem key={note._id} note={note} />
        ))}

        {ticket.status !== 'closed' && (<button onClick={onTicketClose} className={'btn btn-block btn-danger'}>Close Ticket</button>)}

    </div>
}

export default Ticket;