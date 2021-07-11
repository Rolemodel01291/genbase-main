

import {includes} from 'lodash';
import {Treebeard, decorators} from '../src';
import {Div} from '../src/components/common';
import data from './data';
import styles from './styles';
import * as filters from './filter';
import Header from './Header';
import NodeViewer from './NodeViewer';

import {api} from '../../api/api'

const Companies = (props) => {
  
  console.log('props1:',props)
  onToggle = (node, toggled) => {
    const {cursor,data} = this.state;

    if (cursor) {
        this.setState(() => ({cursor, active: false}));
    }

    node.active = true;
    if (node.children) {
        node.toggled = toggled;
    }

    this.setState(() => ({cursor: node, data: Object.assign({}, props.data)}));
  }

  onSelect = (node)=>{
    const {cursor, data} = this.state;

    if (cursor) {
        this.setState(() => ({cursor, active: false}));
        if (!includes(cursor.children, node)) {
            cursor.toggled = false;
            cursor.selected = false;
        }
    }

    node.selected = true;

    this.setState(() => ({cursor: node, data: Object.assign({}, props.data)}));

  }

  onFilterMouseUp = ({target: {value}})=>{
    const filter = value.trim();
    if (!filter) {
        return this.setState(() => ({props.data}));
    }
    let filtered = filters.filterTree(data, filter);
    filtered = filters.expandFilteredNodes(filtered, filter);
    this.setState(() => ({data: filtered}));
   }

   render() {
        const {data, cursor} = this.state;
        return (
            <Fragment>
                <Div style={styles.searchBox}>
                    <Div className="input-group">
                        <span className="input-group-addon">
                            <i className="fa fa-search"/>
                        </span>
                        <input
                            className="form-control"
                            onKeyUp={this.onFilterMouseUp.bind(this)}
                            placeholder="Search the tree..."
                            type="text"
                        />
                    </Div>
                </Div>
                <Div style={styles.component}>
                    <Treebeard
                        data={data}
                        onToggle={this.onToggle}
                        onSelect={this.onSelect}
                        decorators={{...decorators, Header}}
                        customStyles={{
                            header: {
                                title: {
                                    color: 'red'
                                }
                            }
                        }}
                    />
                </Div>
                <Div style={styles.component}>
                    <NodeViewer node={cursor}/>
                </Div>
            </Fragment>
        );
    }

}

export async function getServerSideProps(context) {
  const response = await api.get('show')
  // const json = await response.json()
  return {
     props: { data: response }
  }
}
  

export default Companies;