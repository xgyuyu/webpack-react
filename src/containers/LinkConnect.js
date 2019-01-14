import { connect } from 'react-redux';
import Link from './../components/Link.js';
import { setVisibilityFilter } from './../actions/index';


const mapStateToProps = function(state, ownProps){
    console.log('ownProps--->',ownProps);
	return {
		active: ownProps.filter === state.visibilityFilter
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => {
        dispatch(setVisibilityFilter(ownProps.filter))
    }
})

/**下面这样也可以
 * (state, ownProps) => ({
        active: ownProps.filter === state.visibilityFilter
    }),
    (dispatch,ownProps) => ({
        onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
    })
 */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Link);
