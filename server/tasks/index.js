module.exports = {
  addLabelToGroup:  require('./add-label-to-group'),
  addRepoGroup:     require('./add-repo-group'),
  addViewToRepo:    require('./add-view-to-repo'),
  deleteLabelFromGroup: require('./delete-label-from-group'),
  deleteLabelGroup: require('./delete-label-group'),
  deleteView:       require('./delete-view'),
  getLabelsByGroup: require('./get-labels-by-group'),
  getLabelsByRepo:  require('./get-labels-by-repo'),
  getRepoGroups:    require('./get-repo-groups'),
  getViewsByRepo:   require('./get-views-by-repo'),
  listRepos:        require('./list-repos'),
  login:            require('./login'),
  renderRepo:       require('./render-repo'),
  updateLabel:      require('./update-label'),
  updateRepo:       require('./update-repo')
};