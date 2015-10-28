/**
 * Created by Administrator on 15-10-26.
 */
'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    } = React;


//�趨���õ�����
//ѡ������磺_type_0_2 ��ʾ��һ��Tabѡ�У����ҵڶ���Tab�еĵ�����ѡ��
var prefixType = '_type_';

//ѡ������ʽ�����磺_style_0_2 ��ʾ��һ��Tabѡ�У����ҵڶ���Tab�еĵ�����ѡ��ʱ����ʽ
var prefixStyle = '_style_';

//Ĭ�����ѡ�еı�����ɫ
var defaultBackgroundColor = {backgroundColor:'#fff'};

var MenuList = React.createClass({
    getInitialState: function(){
        var data = this.props.data;
        //���ѡ���index
        var nSelected = this.props.nSelected;
        //ͷ��ѡ���index
        var tabSelected = this.props.tabSelected;
        //�Ƿ��������
        var isokopen = this.props.isokopen;
        var obj = {};
        var kIndex = 0;
        for(var k in data){
            var childData = data[k];
            var cIndex = 0;
            for(var c in childData){
                var type = prefixType + k + '_' + c;
                var style = prefixStyle + k + '_' + c;
                obj[type] = false;
                obj[style] = {};
                //�趨Ĭ��ѡ����
                if(nSelected === cIndex && tabSelected === kIndex){
                    obj[type] = true;
                    obj[style] = defaultBackgroundColor;
                }
                cIndex++;
            }
            kIndex++;
        }
        obj.tabSelected = tabSelected;
        obj.nSelected = nSelected;
        obj.isokopen = isokopen;//��isokopenд��state
        return obj;
    },
    render: function(){
        var header = this.renderlHeader();
        if (this.state.isokopen==false){
            return (
                <View style={styles.containerclose}>
                    <View style={[styles.row, styles.header]}>
                        {header}
                    </View>
                </View>
            );
        }else{
            var left = this.renderLeft();
            var right = this.renderRight();
            return (
                <View style={styles.container}>
                    <View style={[styles.row, styles.header]}>
                        {header}
                    </View>
                    <View style={[styles.row, styles.flex_1]}>
                        <ScrollView style={[styles.flex_1, styles.left_pannel]}>
                            {left}
                        </ScrollView>
                        <ScrollView style={[styles.flex_1, styles.right_pannel]}>
                            {right}
                        </ScrollView>

                    </View>
                </View>
            );
        }

    },

    //��Ⱦͷ��TabBar
    renderlHeader: function(){
        var data = this.props.data;
        var tabSelected = this.state.tabSelected;
        var header = [];
        var tabIndex = 0;
        for(var i in data){
            var tabStyle = null;
            if(tabIndex === tabSelected){
                tabStyle=[styles.header_text, styles.active_blue];
            }else{
                tabStyle = [styles.header_text];
            }
            header.push(
                <TouchableOpacity style={[styles.flex_1, styles.center]}
                                  onPress={this.headerPress.bind(this, i)}>
                    <Text style={tabStyle}>{i}</Text>
                </TouchableOpacity>
            );
            tabIndex ++;
        }
        return header;
    },

    //��Ⱦ���
    renderLeft: function(){
        var data = this.props.data;
        var tabSelected = this.state.tabSelected;
        var leftPannel = [];
        var index = 0;
        for(var i in data){
            if(index === tabSelected){
                for(var k in data[i]){
                    var style = this.state[prefixStyle + i + '_' + k];
                    leftPannel.push(
                        <Text onPress={this.leftPress.bind(this, i, k)}
                              style={[styles.left_row, style]}>  {k}</Text>);
                }
                break;
            }
            index ++;
        }
        return leftPannel;
    },
    //��Ⱦ�ұߣ������˵�
    renderRight: function(){
        var data = this.props.data;
        var tabSelected = this.state.tabSelected;
        var nSelected = this.state.nSelected;
        var index = 0;
        var rightPannel = [];
        for(var i in data){
            if(tabSelected === index ){
                for(var k in data[i]){
                    if(this.state[prefixType + i + '_' + k]){
                        for(var j in data[i][k]){
                            rightPannel.push(
                                <Text onPress={this.props.click.bind(this, data[i][k][j])} style={styles.left_row}>{data[i][k][j]}</Text>);
                        }
                        break;
                    }
                }
            }
            index ++;
        }
        return rightPannel;
    },
    //�����࣬չʾ�Ҳ�����˵�
    leftPress: function(tabIndex, nIndex){
        var obj = {};
        for(var k in this.state){
            //��prefixType����prefixStyle����ȫ����false
            if(k.indexOf(prefixType) > -1){
                var obj = {};
                obj[k] = false;
                this.setState(obj);
            }
            if(k.indexOf(prefixStyle) > -1){
                var obj = {};
                obj[k] = {};
                this.setState(obj);
            }
        }
        obj[prefixType + tabIndex + '_' + nIndex] = true;
        obj[prefixStyle + tabIndex + '_' + nIndex] = defaultBackgroundColor;
        this.setState(obj);
    },
    //ͷ������¼���Tab�л��¼�
    headerPress: function(title){
        var data = this.props.data;
        var index = 0;
        for(var i in data){
            if(i === title){
                this.setState({
                    tabSelected: index,
                    isokopen: true,
                });
                var obj = {};
                var n = 0;
                for(var k in data[i]){
                    if(n !== 0){
                        obj[prefixType + i + '_' + k] = false;
                        obj[prefixStyle + i + '_' + k] = {};
                    }else{
                        obj[prefixType + i + '_' + k] = true;
                        obj[prefixStyle + i + '_' + k] = defaultBackgroundColor;
                    }
                    n ++;
                }
                this.setState(obj);
            }
            index ++;
        }
    }
});

var styles = StyleSheet.create({
    containerclose:{
        height:35,
        flex:1,
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:'#ddd'
    },
    container:{
        height:240,
        flex:1,
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:'#ddd'
    },
    row:{
        flexDirection: 'row'
    },
    flex_1:{
        flex:1
    },
    header:{
        height:35,
        borderBottomWidth:1,
        borderColor:'#DFDFDF',
        backgroundColor:'#F5F5F5'
    },
    header_text:{
        color:'#7B7B7B',
        fontSize:15
    },
    center:{
        justifyContent:'center',
        alignItems:'center'
    },
    left_pannel:{
        backgroundColor:'#F2F2F2',
    },
    left_row:{
        height:30,
        lineHeight:20,
        fontSize:14,
        color:'#7C7C7C',
    },
    right_pannel:{
        marginLeft:10
    },
    active_blue:{
        color: '#00B7EB'
    },
    active_fff:{
        backgroundColor:'#fff'
    }
});

module.exports = MenuList;