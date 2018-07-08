import React, { Component } from "react";
import {connect} from 'react-redux';
import {fetchPosts, deletePost} from '../actions';
import {Link} from 'react-router-dom';

class PostsShow extends Component{
    componentDidMount(){
        const {id} = this.props.match.params;
        this.props.fetchPosts(id);
    }

    onDeleteCLick(){
        const {id} = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const {post} = this.props;

        if(!post){
            return <div> Loading.. </div>
        }

        return(
            <div>
              <Link to="/" ><button className='btn btn-primary'>&lt; Back To Index</button></Link>
              <button
               className="btn btn-danger pull-xs-right"
               onClick = {this.onDeleteCLick.bind(this)}
              >
                  Delete Post 
              </button>
              <h3>{post.title}</h3>
              <h6>Categories: {post.categories}</h6>
              <p>{post.content}</p>
            </div>
        );
    }
}

function mapStateToProps({ posts }, ownProps){
   return {post: posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchPosts, deletePost })(PostsShow);