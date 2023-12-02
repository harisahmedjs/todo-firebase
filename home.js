import { onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth,db} from "./config.js";
import { collection, addDoc ,getDocs ,Timestamp, query, orderBy, deleteDoc, doc, updateDoc, where } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"; 




const form = document.querySelector('#form')
const input = document.querySelector('#text')
const button=document.querySelector('#button')
const div=document.querySelector('.name-div')
const card=document.querySelector('.div-2')


onAuthStateChanged(auth, async (user) => {
  if (user) {
      const uid = user.uid;
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
          // console.log(doc.data());
          div.innerHTML = doc.data().name
         
      });
      getData(user.uid)
  } else {
      window.location = 'index.html'
  }
});
  

  
  button.addEventListener('click',()=>{
    signOut(auth).then(() => {
      console.log('logout successfully');
      
      window.location = './login.html'
    }).catch((error) => {
      console.log(error);
    });
  })

  let arr=[];


  function renderingPost(){
    card.innerHTML=''
    // console.log(arr)
    arr.map((item)=>{
      card.innerHTML+=`<h1>${item.todo}</h1>
      <button type="button" id="delete">Delete</button>
      <button type="button" id="update" >Edit</button
      `
    })
    // renderingPost()
const del=document.querySelectorAll('#delete')
const up=document.querySelectorAll('#update')

// console.log(del)
// console.log(up)

del.forEach((btn, index)=>{
  btn.addEventListener('click',async()=>{
    console.log('delete called',arr[index])
    await deleteDoc(doc(db, "post", arr[index].docId))
    .then(()=>{
      console.log('post deleted')
      arr.splice(index , 1)
      renderingPost()
    })
  })
})

up.forEach((btn,index)=>{
  btn.addEventListener('click',async()=>{
    console.log('update called',arr[index])
    const updatedInput= prompt('enter new value')
await updateDoc(doc(db, "post", arr[index].docId), {
  todo: updatedInput
});
arr[index].todo=updatedInput
renderingPost()
  })
})
  }






  async function getData(uid){
    arr.length=0;
    const q = query(collection(db, "post") , orderBy('postDate','desc') , where('uid','==', uid) )
    const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  arr.push({...doc.data(), docId: doc.id})
  
});
// console.log(arr)
renderingPost()
  }

  
// renderingPost()
// render()
  form.addEventListener('submit',async(event)=>{
event.preventDefault();
// console.log(input.value)
if (input.value==='') {
     alert('first enter value')
    } else {
  
      try {
const postObj={
  todo:input.value,
  uid:auth.currentUser.uid,
  postDate:Timestamp.fromDate(new Date())
}
  
const docRef = await addDoc(collection(db, "post"),postObj);
console.log("Document written with ID: ", docRef.id);
  postObj.docId = docRef.id;
  arr=[postObj,...arr];
  // console.log(arr)
  renderingPost()
  input.value=''
} 
catch (e) {
  console.error("Error adding document: ", e);
}
}

})