import { ListView } from 'antd-mobile';
import React from 'react';
import ReactDOM from 'react-dom';
class SelfListView extends React.Component {
    constructor (props) {
        super(props);
        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        const dataSource = new ListView.DataSource({
            getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });
        this.state = {
            dataSource,
            isLoading: true,
            height: document.documentElement.clientHeight - props.height,
        };
    }
    render () {
        // let index = data.length - 1;
        const row = (rowData, sectionID, rowID) =>
            // if (index < 0) {
            //     index = data.length - 1;
            // }
            // const obj = data[index--];
            (
                <div key={rowID}>

                </div>
            )
        ;
        return (
            <ListView
                ref={(el) => this.lv = el}
                renderRow={row}
                dataSource={this.state.dataSource}
                renderBodyComponent={() => this.props.body}
                style={{
                    height: this.state.height,
                    overflow: 'auto',
                }}
                pageSize={4}
                onScroll={() => {console.log('scroll');}}
                scrollRenderAheadDistance={500}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
            />
        );
    }
}
export default SelfListView
;
