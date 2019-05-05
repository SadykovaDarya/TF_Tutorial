import React, { Component } from 'react';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
//import Tabs from 'react-bootstrap/Tabs';
//import Tab from 'react-bootstrap/Tab';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import '../style.css';
import '../react-tabs.css';



class Materials extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allTopics: [],
            chosenMaterials: [],
            chosenTopic: -1, 
            topicName: "", 
            subtopicNames: []
        };
    }


    componentDidMount() {
        var _this = this;

        fetch('/getTopics')
            .then(response => response.json())
            .then(
                function (json) {
                    var data = json.recordset;

                    var x;
                    var mappedData = [];

                    for (x in data) {
                        mappedData.push({
                            label: data[x].TopicName,
                            value: data[x].ID
                        });
                    }

                    _this.setState({
                        allTopics: mappedData
                    });

                    return data;
                }
        ).catch(err => { return err; });

        this.getMaterials(1);
    }

    getMaterials(topic) {
        var _this = this;

        fetch('/getMaterials?topic=' + topic)
            .then(response => response.json())
            .then(
                function (json) {
                    var data = json.recordset;

                    var x=0;
                    var mappedData = [];

                    for (x in data) {
                        mappedData.push({
                            materialID: data[x].ID,
                            topicID: data[x].TopicID,
                            materialText: data[x].MaterialText,
                            subtopicNumber: data[x].SubtopicNumber, 
                            subtopicName: data[x].SubtopicName,
                            orderNumber: data[x].OrderNumber
                        });
                    }

                    
                    mappedData.sort(function (material1, material2) {
                        // Sort by subtopicNumber
                        // If the first item has a higher number, move it down
                        // If the first item has a lower number, move it up
                        if (material1.subtopicNumber > material2.subtopicNumber) return 1;
                        if (material1.subtopicNumber < material2.subtopicNumber) return -1;

                        // If the subtopicNumber is the same between both items, sort by orderNumber
                        // If the first item has bigger orderNumber, move it up
                        // Otherwise move it down
                        if (material1.OrderNumber > material2.OrderNumber) return 1;
                        if (material1.OrderNumber < material2.OrderNumber) return -1;

                    });

                    _this.setState({
                        chosenMaterials: mappedData
                    }, function () {
                        _this.createTabStructure();
                        });

                    return data;
                }
        ).catch(err => { return err; });
        
    }

    createTabStructure() {
        var Materials = this.state.chosenMaterials;
        var subtopicNames = [];
        var i = 0;
        for (i in Materials) {
            var name = Materials[i].subtopicName;
            var text = Materials[i].materialText;
            var index = subtopicNames.map(function (e) { return e.subtopicName; }).indexOf(name);

            if (index < 0) {
                subtopicNames.push({
                    subtopicName: name,
                    subtopicQty: 1, 
                    subtopicText: text
                });
            } else {
                subtopicNames[index].subtopicQty = subtopicNames[index].subtopicQty + 1;
                subtopicNames[index].subtopicText = subtopicNames[index].subtopicText + '\n' + '\n' + text;
            }
        }
        console.log(subtopicNames);
        this.setState({ subtopicNames: subtopicNames });
    }
    


    handleChangeTopic(text, id) {
        console.log("in handle change!");
        this.getMaterials(id);
        
        
        this.setState({
            chosenTopic: id, 
            topicName: text
        });

    }
    

    renderRedirect() {
        this.props.history.push(
            {
                pathname: '/home',
                state: {
                    topic: this.state.chosenTopic,
                    topicName: this.state.topicName
                }
            }
        );
    }

    handleSelect() {
        this.setState({ selectedIndex: index });
    }



    render() {
        if (this.state.chosenTopic >= 0) {
            return (
                <div className="app">
                    <div className="container">
                        <Select options={this.state.allTopics} placeholder={"Select topic..."} onChange={opt => this.handleChangeTopic(opt.label, opt.value)} />
                    </div>

                
                        <Tabs>
                            <TabList>
                                {
                                    this.state.subtopicNames.map(function (d, idx) {
                                        return (
                                            <Tab key={idx}> {d.subtopicName}</Tab>
                                        );
                                    })
                                }
                            </TabList>

                            {
                                this.state.subtopicNames.map(function (d, idx) {
                                    return (
                                        <TabPanel key={idx}> {d.subtopicText}</TabPanel>
                                    );
                                })
                            }
                            
                        </Tabs>
                

                <div>
                    <Button value="Go!" onClick={this.renderRedirect.bind(this)}> Go to Quiz! </Button>
                </div>

                </div>
            );
        }

        return (
            <div className="app">
                <div className="container">
                    <Select options={this.state.allTopics} placeholder={"Select topic..."} onChange={opt => this.handleChangeTopic(opt.label, opt.value)} />
                </div>
            </div>
        );
    }

}

export default Materials;
