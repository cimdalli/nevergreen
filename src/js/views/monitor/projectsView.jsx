var $ = require('jquery')
var React = require('react')
var styler = require('../../monitor/styler')

var InterestingProject = React.createClass({
    propTypes: {
        prognosis: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired
    },

    render: function () {
        return (
            <li className={'monitor-project monitor-' + this.props.prognosis}>
                <div className='monitor-outerContainer'>
                    <div className='monitor-innerContainer'>{this.props.name}</div>
                </div>
            </li>
        )
    }
})

module.exports = {
    InterestingProjects: React.createClass({
        propTypes: {
            projects: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
        },

        render: function () {
            return (
                <ul id='interesting-projects' className='monitor-projects'>
                    {
                        this.props.projects.map(function (project) {
                            return <InterestingProject key={project.name} prognosis={project.prognosis} name={project.name}/>
                        })
                    }
                </ul>
            )
        },

        componentDidMount: function () {
            var $node = $(React.findDOMNode(this))
            styler.styleProjects(this.props.projects, $node.find('.monitor-outerContainer'), $node)
        },

        componentDidUpdate: function () {
            var $node = $(React.findDOMNode(this))
            styler.styleProjects(this.props.projects, $node.find('.monitor-outerContainer'), $node)
        }
    })
}
