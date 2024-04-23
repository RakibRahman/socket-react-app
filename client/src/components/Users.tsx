import React, { useEffect, useState } from 'react'

export const Users = () => {
    const endPoint = 'http://localhost:3000/users';
    const [users,setUsers] = useState<any[]>([]);


    useEffect(()=>{
        fetch(endPoint).then((res)=>{
         
            return res.json()
        }).then((data):void=>{
            console.log(data)
            if(data?.success){
                setUsers(data?.data??[])
            }
        }).catch((err)=>
    {
        console.log(err)
    })


    },[])
  return (
    <div>Users

        {users.length>0 && users.map((user)=>(
            <h1 key={user.id}>{user?.id}-{user?.name}-{user?.email}</h1>
        ))}
    </div>
  )
}
