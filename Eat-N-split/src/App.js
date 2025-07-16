import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
//children prop
function Button({children, onClick}){
  return(
    <button className="button" onClick={onClick}>{children}</button>
  )
}

export default function App(){
  const[friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);

  const[selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend(){
    setShowAddFriend(showAddFriend=>!showAddFriend)
  }

  function handleAddFriend(friend){
    setFriends(friends => [...friends, friend]);
  }

  function handleSelectedFriend(friend){
    setSelectedFriend(friend);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} onSelection={handleSelectedFriend} selectedFriend={selectedFriend}/>

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} onShowAddFriend={handleShowAddFriend}/>}

        {/* <Button onClick={handleShowAddFriend}>Add Friend</Button>  THIS DOESNT HAVE ONCLICK PROPERTY SO IT WONT WORK*/  }

        <Button onClick={handleShowAddFriend}>{showAddFriend ? 'close':'Add friend'}</Button>


      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
      
    </div>
  );
}

// function FriendsList(){
//   const friends = initialFriends.map(friend => (<li key={friend.id}>
//     <img src={friend.image} alt={friend.name} />
//     <h3>{friend.name}</h3>
//     {friend.balance < 0 && 
//       (<p style={{color:'red'}}>
//         You owe {friend.name} Math.abs({friend.balance})$
//         </p>
//       )}
    
//     {friend.balance > 0 && (<p style={{color:'green'}}>{friend.name} owe you {friend.balance}</p>)}
//     {friend.balance === 0 && (<p style={{color:'black'}}>You both are even</p>)}
//   </li>));

//   return (
//     <ul>{friends}</ul>
//   )
// }

function FriendsList({friends, onSelection, selectedFriend}){
// const friends = initialFriends;---- lifinging to upper state (app)
  return (<ul>{
    friends.map(friend => (
      <Friend friend={friend} key={friend.id} onSelection={onSelection} selectedFriend={selectedFriend}/>
    ))}
  </ul>
);
}

function Friend({friend, onSelection,selectedFriend}){
  const isSelected = selectedFriend.id === friend.id;

  return <li className={isSelected ? "selected" : ""}>
    <img src={friend.image} alt={friend.name} />
    <h3>{friend.name}</h3>
    {friend.balance < 0 && (
      <p className="red">You owe {friend.name} Math.abs({friend.balance})$ </p>
    )}

    {friend.balance > 0 && (
      <p className="green">{friend.name} owe you {friend.balance}$ </p>
    )}

    {friend.balance === 0 && (
      <p className="black">You and {friend.name} are even </p>
    )}

    <Button onClick={()=>onSelection(friend)}>{isSelected ? "close" : "select"}</Button>

  </li>
}



function FormAddFriend({onShowAddFriend, onAddFriend}) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=499476");

  function handleSubmit(e){
    e.preventDefault();

    if(!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {id,name,image:`${image}?=${id}`,balance:0, };
    // id: crypto.randomUUID() 
    onAddFriend(newFriend);
    onShowAddFriend(); //or can even do it even in onAddFriend function.
    //set it to default again
    setName("");
    setImage("https://i.pravatar.cc/48?u=499476");

  }

  return <form className="form-add-friend" onSubmit={handleSubmit}>
    <label>👩🏼‍🤝‍👩🏼Friend Name</label>
    <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>

    <label>🌆 image URL</label>
    <input type="text"  value={image} onChange={(e)=>setImage(e.target.value)}/>

    <Button onClick={handleSubmit}>Add</Button>
  </form>
}

function FormSplitBill({selectedFriend}) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name} </h2>
      <label>👜 Bill value</label>
      <input type="number"/>

      <label>👧 Your expenses </label>
      <input type="number"/>

      <label>👀{selectedFriend.name}'s expenses </label>
      <input type="number"/>

      <label>🤑 Who is paying the bill ?</label>
      <select >
        <option value="you">You</option>
        <option value="friend1">Clark </option>
      </select>
      <Button>split bill</Button>
    </form>
  );
}