# zsmcJs
## Grid
#### GridView

##### Dependency
* jQuery
* font-awesome
* bootstrap 
* bootstrap-datepicker

##### Columns
* text
* number
* select
* date
* checkbox
* textarea
* lookup (zsmc widget)
* link
##### Editing
* mode - inline, popup
* editType - text, date, select, radio, check, textarea, link, lookup(zsmcJs) : If Needs
* action - local, remote
* can be managed the dirty fields
##### Paging
* action - local, remote
##### Sorting
* action - local, remote
##### Grouping
##### Binding
##### History 
##### Events
* onBeforeLoadData
* onLoadedData
* onRowUpdating
* onRowUpdated
* onRowDeleting
* onRowDeleted
* onRowClicked
* onRowDblClicked
* onRowEnterKeyDown
* onEditorLoaded
* onBeforeSorting
* onAfterSorting
* onBeforePaging
* onAfterPaging
* onBeforeLoadDetails
* onBeforeOpenPopup
* onAfterOpenPopup
#### Provider
* getJsonByRowId
* getIndexByRowId
* getInsertedRecords
* getUpdatedRecords
* getDeletedRecords
* getChangedRecords
* getVisibleColumns
* getSelectedRow
* removeByRowId


#### Samples
###### Sample Data
```javascript
var data = [{
    Id: 1
    , Name: 'Jennifer'
    , Phone: '1-342-463-8341'
    , Company: 'Et Rutrum Non Associates'
    , Zip: 35728
    , City: 'Fogo'
    , BirthDay: new Date(2014, 3, 4)
    , Use: true
},
{
    Id: 2
    , Name: 'Clark'
    , Phone: '1-516-859-1120'
    , Company: 'Nam Ac Inc.'
    , Zip: 7162
    , City: 'Machelen'
    , BirthDay: new Date(2013, 3, 23)
    , Use: true
},
{
    Id: 3
    , Name: 'Brendan'
    , Phone: '1-724-406-2487'
    , Company: 'Enim Commodo Limited'
    , Zip: 98611
    , City: 'Norman'
    , BirthDay: new Date(2014, 2, 13)
    , Use: true
},
{
    Id: 4
    , Name: 'Warren'
    , Phone: '1-412-485-9725'
    , Company: 'Odio Etiam Institute'
    , Zip: 10312
    , City: 'Sautin'
    , BirthDay: new Date(2013, 1, 1)
    , Use: true
}]
```
###### Column Settings
```javascript
var columns = [
    {
        header: 'Id'
        , name: 'Id'
        , visible: false
    }
    , {
        header: 'Name'
        , name: 'Name'
        , width: 200
        , dataType: 'text'
        , displayType: 'link'
        , link: '/Home/ZsmcBinding/{{Id}}'
        , target: '_blank'
    }
    , {
        header: 'Phone'
        , name: 'Phone'
        , align: 'center'
        , width: 200
    }
    , {
        header: 'Company'
        , name: 'Company'
        , width: 400
    }
    , {
        header: 'Zip'
        , name: 'Zip'
        , width: 120
        , dataType: 'number'
    }
    , {
        header: 'City'
        , name: 'City'
        , width: 120
    }
    , {
        header: 'BirthDay'
        , name: 'BirthDay'
        , align: 'center'
        , width: 100
        , dataType: 'datetime'
        , displayType: 'datetime'
        , displayFormat: 'yyyy-mm-dd'
    }
    , {
        header: 'Use'
        , name: 'Use'
        , align: 'center'
        , width: 100
        , dataType: 'bool'
        , displayType: 'checkbox'
    }
]
```

###### Basic Binding
```javascript
var grid = new zsmcJs.grid({
    keyField: 'Id',
    maxWidth: '100%',
    columns: columns //references column settgins
});
grid.GridView.draw($("#grid"));
grid.Provider.bindData(data);
```
###### Paging & Sorting (Local)
```javascript
var grid = new zsmcJs.grid({
    keyField: 'Id',
    maxWidth: '100%',
    columns: columns, 
    viewOptions: {
        actionMode: 'local',
        paging: {
            visible: true,
            rowCount: 5,
            blockSize: 5
        },
        sorting: {
            visible: true
        }
    }
});
grid.GridView.draw($("#grid"));
grid.Provider.bindData(data);
```
###### Paging & Sorting (Remote)
```javascript
var grid2 = new zsmcJs.grid({
    keyField: 'Id',
    width: '100%',
    columns: columns,
    viewOptions: {
        actionMode: 'remote',
        loadUrl: '/api/User/GetUsers/',
        paging: {
            visible: true,
            rowCount: 5,
            blockSize: 5
        },
        sorting: {
            visible: true
        }
    }
});
grid2.GridView.draw($("#grid2"));
```
```javascript
/// <summary>
/// ServerSide Action  
/// </summary>
/// <param name="sortingColumn"></param>
/// <param name="sortingDataType"></param>
/// <param name="direction"></param>
/// <param name="pageNumber"></param>
/// <param name="rowCount"></param>
/// <returns>Entities</returns>
public string GetUsers(string sortingColumn, string sortingDataType, string direction, int pageNumber, int rowCount)
{
    return Newtonsoft.Json.JsonConvert.SerializeObject(new { list = userList.Skip((pageNumber - 1) * rowCount).Take(rowCount).ToList(), totalCount = User.Count });
}
```
###### Editing
```javascript
var grid = new zsmcJs.grid({
keyField: 'Id',
width: '100%',
columns: [
    {
        header: 'Id'
        , name: 'Id'
        , visible: false
    }
    , {
        header: 'Name'
        , name: 'Name'
        , width: 200
        , dataType: 'text'
        , displayType: 'link'
        , link: '/Home/ZsmcBinding/{{Id}}'
        , target: '_blank'
        , editor: {
            type: 'text'
        }
    }
    , {
        header: 'Phone'
        , name: 'Phone'
        , align: 'center'
        , width: 200
        , editor: {
            type: 'text'
        }
    }
    , {
        header: 'Company'
        , name: 'Company'
        , width: 400
        , editor: {
            type: 'text'
        }
    }
    , {
        header: 'Zip'
        , name: 'Zip'
        , width: 120
        , dataType: 'number'
        , editor: {
            type: 'text'
        }
    }
    , {
        header: 'City'
        , name: 'City'
        , width: 120
        , editor: {
            type: 'select'
        },
        selectOptions: [
                { text: 'Fogo', value: 1 }
            , { text: 'Machelen', value: 2 }
            , { text: 'Norman', value: 3 }
            , { text: 'Sautin', value: 4 }
        ]
    }
    , {
        header: 'BirthDay'
        , name: 'BirthDay'
        , align: 'center'
        , width: 100
        , dataType: 'datetime'
        , displayType: 'datetime'
        , displayFormat: 'yyyy-mm-dd'
        , editor: {
            type: 'date'
        }
    }
    , {
        header: 'Use'
        , name: 'Use'
        , align: 'center'
        , width: 100
        , dataType: 'bool'
        , displayType: 'checkbox'
        , editor: {
            type: 'checkbox'
        }
    }
],
editOptions: {
    actionMode: 'local',
    actionColumn: {
        width: 100,
        visible: true,
        newAction: {
            visible: true
        },
        editAction: {
            visible: true
        },
        deleteAction: {
            visible: true
        }
    },
    editing: {
        mode: 'inline', //cell, inline, popup
        addButton: {
            caption: 'Add'
            , visible: true
        },
        updateButton: {
            caption: 'Update'
            , visible: true
        },
        cancelButton: {
            caption: 'Cancel'
            , visible: true
        },
        copyButton: {
            caption: 'Copy'
            , visible: false
        },
        deleteButton: {
            caption: 'Delete'
            , visible: true
        },
        insertButton: {
            caption: 'Insert'
            , visible: false
        }
    }
}
});
grid.GridView.draw($("#grid"));
grid.Provider.bindData(data);
```
###### Fixed Column
```javascript
var grid = new zsmcJs.grid({
    keyField: 'Id',
    maxWidth: '100%',
    columns: [{
                header: 'Id'
                , name: 'Id'
                , visible: false
            }
            , {
                header: 'Name'
                , name: 'Name'
                , width: 200
                , dataType: 'text'
                , displayType: 'link'
                , link: '/Home/ZsmcBinding/{{Id}}'
                , target: '_blank'
                , fixed: true
            }
            , {
                header: 'Phone'
                , name: 'Phone'
                , align: 'center'
                , width: 200
            }
            , {
                header: 'Company'
                , name: 'Company'
                , width: 400
            }
            , {
                header: 'Zip'
                , name: 'Zip'
                , width: 120
                , dataType: 'number'
            }
            , {
                header: 'City'
                , name: 'City'
                , width: 120
            }
            , {
                header: 'BirthDay'
                , name: 'BirthDay'
                , align: 'center'
                , width: 100
                , dataType: 'datetime'
                , displayType: 'datetime'
                , displayFormat: 'yyyy-mm-dd'
            }
            , {
                header: 'Use'
                , name: 'Use'
                , align: 'center'
                , width: 100
                , dataType: 'bool'
                , displayType: 'checkBox'
            }
        ]
});
```
###### View Options
```javascript
var grid = new zsmcJs.grid({
    keyField: 'Id',
    maxWidth: '100%',
    columns: columns,
    viewOptions: {
        selectable: true
    }
});
grid.GridView.draw($("#grid"));
grid.Provider.bindData(data);
```
```javascript
var grid = new zsmcJs.grid({
    keyField: 'Id',
    maxWidth: '100%',
    columns: columns,
    viewOptions: {
        checkable: true
    }
});
grid.GridView.draw($("#grid"));
grid.Provider.bindData(data);
```
```javascript
var grid = new zsmcJs.grid({
    keyField: 'Id',
    maxWidth: '100%',
    columns: columns,
    viewOptions: {
        groupBy: ["CorpType", "EmployeeType"]
    }
});
grid.GridView.draw($("#grid"));
grid.Provider.bindData(data);
```
###### Events
```javascript
onBeforeLoadDetails: function (type, entityName, data)
onBeforeOpenPopup: function (data)
onAfterOpenPopup: function ()
onBeforeLoadData: function ()
onLoadedData: function (data)
onRowUpdating: function (data, rowId)
onRowUpdated: function (data, rowId)
onRowDeleting: function (data, rowId)
onRowDeleted: function (data, rowId)
onRowClicked: function (data, rowId)
onRowDblClicked: function (data, rowId)
onRowEnterKeyDown: function (data, rowId)
onEditorLoaded: function ($el, data, rowId)
onBeforeSorting: function (header, rowId)
onAfterSorting: function (header, rowId)
onBeforePaging: function (header, rowId)
onAfterPaging: function (header, rowId)
```