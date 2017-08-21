import Constants from '../lib/Constants';
import _ from 'lodash'

const { REDDIT } = Constants;

const reddit = (state = {subReddit:'',tracks:[], error: false}, action) => {
  switch (action.type) {
    case REDDIT.SEARCH_COMPLETE: {
      return _.extend({}, state, {tracks: action.tracks, subReddit:action.subReddit, error: action.error});
    }
    default:
      return state
  }
}

export default reddit;