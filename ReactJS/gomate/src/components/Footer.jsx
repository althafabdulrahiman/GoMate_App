const Footer =()=>{
    return (
        <div>
            <footer className="text-center text-white" style={{backgroundColor:"gray",position:"relative",bottom:"0",width:"100%",marginTop:"50px"}}>
    <div className="container p-4 pb-0">
        <section className="">
            <form action="">
                <div className="row d-flex justify-content-center">
                    <div className="col-auto">
                        <p className="pt-2">
                            <strong>Comment</strong>
                        </p>
                    </div>
                    <div className="col-md-5 col-12">
                        <div className="form-outline form-white mb-4">
                            <input type="email" id="form5Example2" className="form-control" />
                            {/* <label className="form-label" htmlFor="form5Example2">Email address</label> */}
                        </div>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-outline-light mb-4">
                            Subscribe
                        </button>
                    </div>
                </div>
            </form>
        </section>
        </div>
        </footer>


        </div>
    )
}
export default Footer;