import axios from "axios";

const instance=axios.create({
    abaseURL:"https://api.themoviedb.org/3"
})

export default instance;