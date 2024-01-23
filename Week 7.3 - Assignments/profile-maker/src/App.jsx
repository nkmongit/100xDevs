import Info from "./components/Info";
import ProfileInfoCard from "./components/ProfileInfoCard";

function App() {
  return (
    <div>
      <div className="flex justify-center">
        <img
          className="w-full h-96"
          src="https://images.unsplash.com/photo-1588421357574-87938a86fa28?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <img
          className="p-5 rounded-full h-96 absolute top-20"
          src="https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80&w=1349&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
      <Info name={"Rita Sahay"} age={"32"} place={"London"} />

      <div className="flex justify-around">
        <ProfileInfoCard count={"80K"} value={"Followers"} />{" "}
        <ProfileInfoCard count={"803K"} value={"Likes"} />{" "}
        <ProfileInfoCard count={"1.4K"} value={"Photos"} />
      </div>
    </div>
  );
}

export default App;
