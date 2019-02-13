var productCategoryController = function () {

    this.initialize = function () {
        loadData();
        demo5([{
            "text": "Parent Node",
            "children": [{
                "text": "Initially selected",
                "state": {
                    "selected": true
                }
            }, {
                "text": "Custom Icon",
                "icon": "fa fa-warning m--font-danger"
            }, {
                "text": "Initially open",
                "icon": "fa fa-folder m--font-success",
                "state": {
                    "opened": true
                },
                "children": [
                    { "text": "Another node", "icon": "fa fa-file m--font-waring" }
                ]
            }, {
                "text": "Another Custom Icon",
                "icon": "fa fa-warning m--font-waring"
            }, {
                "text": "Disabled Node",
                "icon": "fa fa-check m--font-success",
                "state": {
                    "disabled": true
                }
            }, {
                "text": "Sub Nodes",
                "icon": "fa fa-folder m--font-danger",
                "children": [
                    { "text": "Item 1", "icon": "fa fa-file m--font-waring" },
                    { "text": "Item 2", "icon": "fa fa-file m--font-success" },
                    { "text": "Item 3", "icon": "fa fa-file m--font-default" },
                    { "text": "Item 4", "icon": "fa fa-file m--font-danger" },
                    { "text": "Item 5", "icon": "fa fa-file m--font-info" }
                ]
            }]
        },
            "Another Node"
        ]);
        registerEvents();


    }


    function registerEvents() {
        $('#frmMaintainance').validate({
            errorClass: 'red',
            ignore: [],
            lang: 'en',
            rules: {
                txtNameM: { required: true },
                txtOrderM: { required: true, number: true }
            }
        });

        $('#btnCreate').off('click').on('click', function () {
            resetFormMaintainance();
            initTreeDropDownCategory();
            $('#modal-add-edit').modal('show');
        });

        $('#btnSelectImg').on('click', function () {
            $('#fileInputImage').click();
        });

        $("#fileInputImage").on('change', function () {
            var fileUpload = $(this).get(0);
            var files = fileUpload.files;
            var data = new FormData();
            for (var i = 0; i < files.length; i++) {
                data.append(files[i].name, files[i]);
            }
            $.ajax({
                type: "POST",
                url: "/Admin/Upload/UploadImage",
                contentType: false,
                processData: false,
                data: data,
                success: function (path) {
                    $('#txtImage').val(path);
                    be.notify('Upload image succesful!', 'success');

                },
                error: function () {
                    be.notify('There was error uploading files!', 'error');
                }
            });
        });

        $('body').on('click', '#btnEdit', function (e) {
            e.preventDefault();
            var that = $('#hidIdM').val();
            $.ajax({
                type: "GET",
                url: "/Admin/ProductCategory/GetById",
                data: { id: that },
                dataType: "json",
                beforeSend: function () {
                    be.startLoading();
                },
                success: function (response) {
                    $('#hidIdM').val(response.Id);
                    $('#txtNameM').val(response.Name);

                    initTreeDropDownCategory(response.ParentId);

                    $('#txtDescM').val(response.Description);

                    $('#txtImageM').val(response.ThumbnailImage);

                    $('#txtSeoKeywordM').val(response.SeoKeywords);
                    $('#txtSeoDescriptionM').val(response.SeoDescription);
                    $('#txtSeoPageTitleM').val(response.SeoPageTitle);
                    $('#txtSeoAliasM').val(response.SeoAlias);

                    $('#ckStatusM').prop('checked', response.Status == 1);
                    $('#ckShowHomeM').prop('checked', response.HomeFlag);
                    $('#txtOrderM').val(response.SortOrder);
                    $('#txtHomeOrderM').val(response.HomeOrder);

                    $('#modal-add-edit').modal('show');
                    be.stopLoading();

                },
                error: function (status) {
                    be.notify('Có lỗi xảy ra', 'error');
                    be.stopLoading();
                }
            });
        });

        $('body').on('click', '#btnDelete', function (e) {
            e.preventDefault();
            var that = $('#hidIdM').val();
            be.confirm('Are you sure to delete?', function () {
                $.ajax({
                    type: "POST",
                    url: "/Admin/ProductCategory/Delete",
                    data: { id: that },
                    dataType: "json",
                    beforeSend: function () {
                        be.startLoading();
                    },
                    success: function (response) {
                        be.notify('Deleted success', 'success');
                        be.stopLoading();
                        loadData();
                    },
                    error: function (status) {
                        be.notify('Has an error in deleting progress', 'error');
                        be.stopLoading();
                    }
                });
            });
        });

        $('#btnSave').on('click', function (e) {
            var isValid = $('#frmMaintainance').valid();
            if (isValid) {
                e.preventDefault();
                var id = parseInt($('#hidIdM').val());
                var parentId = $('#ddlCategoryIdM').combotree('getValue');
                if (id == parentId && id != 0) {
                    be.notify('Loại và loại cha không được trùng nhau', 'error');
                    $('#modal-add-edit').modal('hide');
                    return false;
                }
                var name = $('#txtNameM').val();
                var description = $('#txtDescM').val();
                var image = $('#txtImageM').val();
                var order = parseInt($('#txtOrderM').val());
                var homeOrder = $('#txtHomeOrderM').val();
                var seoKeyword = $('#txtSeoKeywordM').val();
                var seoMetaDescription = $('#txtSeoDescriptionM').val();
                var seoPageTitle = $('#txtSeoPageTitleM').val();
                var seoAlias = $('#txtSeoAliasM').val();
                var status = $('#ckStatusM').prop('checked') == true ? 1 : 0;
                var showHome = $('#ckShowHomeM').prop('checked');

                $.ajax({
                    type: "POST",
                    url: "/Admin/ProductCategory/SaveEntity",
                    data: {
                        Id: id,
                        Name: name,
                        Description: description,
                        ParentId: parentId,
                        HomeOrder: homeOrder,
                        SortOrder: order,
                        HomeFlag: showHome,
                        Image: image,
                        Status: status,
                        SeoPageTitle: seoPageTitle,
                        SeoAlias: seoAlias,
                        SeoKeywords: seoKeyword,
                        SeoDescription: seoMetaDescription
                    },
                    dataType: "json",
                    beforeSend: function () {
                        be.startLoading();
                    },
                    success: function (response) {
                        be.notify('Update success', 'success');
                        $('#modal-add-edit').modal('hide');

                        resetFormMaintainance();

                        be.stopLoading();
                        loadData(true);
                    },
                    error: function () {
                        be.notify('Has an error in update progress', 'error');
                        be.stopLoading();
                    }
                });
            }
            return false;
        });
    }
    function resetFormMaintainance() {
        $('#hidIdM').val(0);
        $('#txtNameM').val('');
        initTreeDropDownCategory();

        $('#txtDescM').val('');
        $('#txtOrderM').val('');
        $('#txtHomeOrderM').val('');
        $('#txtImageM').val('');

        $('#txtMetakeywordM').val('');
        $('#txtMetaDescriptionM').val('');
        $('#txtSeoPageTitleM').val('');
        $('#txtSeoAliasM').val('');

        $('#ckStatusM').prop('checked', true);
        $('#ckShowHomeM').prop('checked', false);
    }
    function initTreeDropDownCategory(selectedId) {
        $.ajax({
            url: "/Admin/ProductCategory/GetAll",
            type: 'GET',
            dataType: 'json',
            async: false,
            success: function (response) {
                response.sort(function (a, b) {
                    return a.sortOrder - b.sortOrder;
                });

                $('#ddlCategoryIdM').combotree({
                    data: response,
                });
                if (selectedId != undefined) {
                    $('#ddlCategoryIdM').combotree('setValue', selectedId).combotree('disable');
                }
            }
        });
    }
    function loadData() {
        $.ajax({
            url: '/Admin/ProductCategory/GetAll',
            dataType: 'json',
            success: function (response) {
                response.sort(function (a, b) {
                    return a.sortOrder - b.sortOrder;
                });
                $('#treeProductCategory').tree({
                    data: response,
                    dnd: true,
                    formatter: function (node) {
                        var s = node.text;
                        if (node.children) {
                            s += '&nbsp;<span style=\'color:blue\'>(' + node.children.length + ')</span>';
                        }
                        return s;
                    },
                    onContextMenu: function (e, node) {
                        e.preventDefault();
                        // select the node
                        $('#hidIdM').val(node.id);
                        // display context menu
                        $('#contextMenu').menu('show', {
                            left: e.pageX,
                            top: e.pageY
                        });
                    },
                    onDrop: function (target, source, point) {
                        console.log(target);
                        console.log(source);
                        console.log(point);
                        var targetNode = $(this).tree('getNode', target);
                        if (point === 'append') {
                            var children = [];
                            $.each(targetNode.children, function (i, item) {
                                children.push({
                                    key: item.id,
                                    value: i
                                });
                            });

                            //Update to database
                            $.ajax({
                                url: '/Admin/ProductCategory/UpdateParentId',
                                type: 'post',
                                dataType: 'json',
                                data: {
                                    sourceId: source.id,
                                    targetId: targetNode.id,
                                    items: children
                                },
                                success: function (res) {
                                    loadData();
                                }
                            });
                        }
                        else if (point === 'top' || point === 'bottom') {
                            $.ajax({
                                url: '/Admin/ProductCategory/ReOrder',
                                type: 'post',
                                dataType: 'json',
                                data: {
                                    sourceId: source.id,
                                    targetId: targetNode.id
                                },
                                success: function (res) {
                                    loadData();
                                }
                            });
                        }
                    }
                });
            }
        });
    }
    var demo5 = function () {
        $("#m_tree_5").jstree({
            "core": {
                "themes": {
                    "responsive": false
                },
                // so that create works
                "check_callback": true,
                'data': newData
            },
            "types": {
                "default": {
                    "icon": "fa fa-folder m--font-success"
                },
                "file": {
                    "icon": "fa fa-file  m--font-success"
                }
            },
            "state": { "key": "demo2" },
            "plugins": ["contextmenu", "dnd", "state", "types"],
            "contextmenu": {
                "items": contextmenuHandle
            }
        })
            .bind("move_node.jstree", (e, data) => {
                debugger;
            })
        //.bind("delete_node.jstree", (e, data) => { })
        //.bind("rename_node.jstree", (e, data) => { })
        //.bind("create_node.jstree", (e, data) => { });
    }

    var contextmenuHandle = function ($node) {
        var tree = $("#m_tree_5").jstree(true);
        return {
            "Create": {
                "separator_before": false,
                "separator_after": false,
                "label": "Create",
                "action": function (obj) {
                    debugger;
                    $node = tree.create_node($node);
                    //$('#modal-add-edit').modal('show');
                    //tree.edit($node);
                }
            },
            "Rename": {
                "separator_before": false,
                "separator_after": false,
                "label": "Edit",
                "action": function (obj) {
                    debugger;
                    //tree.edit($node);
                }
            },
            "Remove": {
                "separator_before": false,
                "separator_after": false,
                "label": "Remove",
                "action": function (obj) {
                    tree.delete_node($node);
                }
            }
        };
    }

    var newData = [{
        "text": "Parent Node",
        "children":
            [
                {
                    "text": "Initially selected",
                    "id":"10",
                    //"state": { "selected": true }
                },
                {
                    "text": "Custom Icon",
                    "id":"30",
                    "icon": "fa fa-warning m--font-danger"
                },
                {
                    "text": "Initially open",
                    "icon": "fa fa-folder m--font-success",
                    "state": { "opened": true },
                    "children": [
                        { "text": "Another node", "icon": "fa fa-file m--font-waring" }
                    ]
                }, {
                    "text": "Another Custom Icon",
                    "icon": "fa fa-warning m--font-waring"
                }, {
                    "text": "Disabled Node",
                    "icon": "fa fa-check m--font-success",
                    "state": {
                        "disabled": true
                    }
                }, {
                    "text": "Sub Nodes",
                    "icon": "fa fa-folder m--font-danger",
                    "children": [
                        { "text": "Item 1", "icon": "fa fa-file m--font-waring" },
                        { "text": "Item 2", "icon": "fa fa-file m--font-success" },
                        { "text": "Item 3", "icon": "fa fa-file m--font-default" },
                        { "text": "Item 4", "icon": "fa fa-file m--font-danger" },
                        { "text": "Item 5", "icon": "fa fa-file m--font-info" }
                    ]
                }]
    }
    ];

    //$('#modal-add-edit').modal('hide');
    //$('#m_tree_5').jstree(true).settings.core.data = newData;
    //$('#m_tree_5').jstree(true).refresh();
}