const authenticate = (req, res, next) => {
    // const header = req.headers

    const {authorisation} = req.headers;

    // const authorisation = req.get("Authorisation");
    console.log("authorisation: ",authorisation);
}

export default authenticate;