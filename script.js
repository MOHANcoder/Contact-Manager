

const {createStore} = Redux;
const {useEffect,useState} = React;
const {Provider,connect,useSelector,useDispatch} = ReactRedux;
const initialState = {
    persons:[]
};
//const store = 

const contactReducer =  (state=initialState,action) => {
    console.log(`State and Action recieved : ${JSON.stringify(state)},${action.type}`);
    switch(action.type){
        case "ADD_CONTACT":
        
            console.log(`State updated as : ${JSON.stringify({persons:[...state.persons,{ name:action.payload.name,id : new Date()}]})}`);
        return {
        persons:[...state.persons,
            { 
            name:action.payload.name,
            id : new Date()
            }
            ]
        };
        
        case "DELETE_CONTACT":
        
        return {
            persons:
            state.persons.filter(
                person=>person.name!==action.payload.name && person.id!==action.payload.id
            )
        };
        
        default:
        return state;
    }
}
    
const store = createStore(contactReducer);

const Heading = props =>{
    return (
        <h1>{props.title}</h1>
    )
}

const addNew = (person) =>{
    console.log(`Action sent : ${person}`);
    return {
        type:"ADD_CONTACT",
        payload:{
            name:person
        }
    }
}

const deleteContact = (id,contact) =>{
    
    return {
        type:"DELETE_CONTACT",
        payload:{
            id,
            contact
        }
    }
}



const ContactManager = (props)=>{
    return (
        <div>
            <AddContact/>
            <ContactList/>
        </div>
    );
}

const AddContact = (()=>{

const mapStateToProps=(state)=>{
    return state;
}

const mapDispatchToProps=()=>{
    return {
        addNew
    };
}

const AddContact = props =>{
    const { addNew } = props;
    const [contact,setContact] = useState("");
    const dispatch = useDispatch();

    const handleSubmit =(event)=>{
        event.preventDefault();
        
    }
    
    const handleAdd = (event)=>{
        setContact(event.target.value);
        
    }
    
    const dispatchContact = ()=>{
        if(contact===""){
            alert("Enter a contact!");
            return;
        }
        dispatch(addNew(contact));
        setContact("");
    }
    
    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <div>
                <input placeholder="Add to contacts" onChange={handleAdd} value={contact}/>
            </div>
            <input type="button" defaultValue="Add" onClick={dispatchContact}/>
        </form>
    )
    }
    return connect(mapStateToProps,mapDispatchToProps)(AddContact);
    
}
)();


const App = ()=>{
    return (
        <Provider store={store}>
            <React.Fragment>
            <Heading title="Contact Manager"/>
            <ContactManager/>
            </React.Fragment>
        </Provider>
        
        
    )
};


const ContactList = (()=>{

    
    const mapStateToProps = (state)=>{
        
        console.log(`State recieved : ${JSON.stringify(state)}`);
        return {
            state
        };
    }
    
    const ContactList = (props)=>{
        const {state} = props;
        
        return (
            <div className="contactList">
                <ul>
                    {
                        state.persons.map((person)=>{
                            return <li key={person.id} ><Cross id={person.id} name={person.name}/><span className="contactName">{person.name}</span></li>
                        })
                    }
                </ul>
            </div>
        )
    };
    
    return connect(mapStateToProps)(ContactList);
    
})();

const Cross = (()=>{

    function Cross(props){
        const {deleteContact,id,contact} = props;
        const dispatch = useDispatch();
        
        return (
            <button className="crossButton" onClick={()=>dispatch(deleteContact(id,contact))}>x</button>
        );
    }

    
    function mapDispatchToProps(){
        return{
            deleteContact
        }
    }
    return connect(null,mapDispatchToProps)(Cross);
})();

ReactDOM.render(
    <App/>,
    document.getElementById("root")
);
