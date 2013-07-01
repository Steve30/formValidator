formValidator
=============
<p>This is a new formvalidator jQuery Plugin.<br/>
It has a simple and customizable configuration, fast plugin and compatible the all modern browser.</p>

<div>
<h3>
  Support Browsers:
</h3>
<ul>
  <li>IE9 and above</li>
  <li>Chrome</li>
  <li>Firefox</li>
</ul>
</div>

<div>
<h3>
  Configuration: 
</h3>
  <p>
    <h4>Options:</h4>
    <p formElements: // List the all input elements, it must be><br/>
    The next params are examples, you modify some params
    </p>
    <ul>
      <li>
        name: // The form elements Id
      </li>
      <li>
        rules: // The rule object
        <ul>
          <li>
            errorText: 'Wrong field' // This param needed, but the string is may be empty
          </li>
          <li>
            passing: false // Passed variable, the rule completed or not
          </li>
          <li>
            emptyValue or uppercase the custom rules value, you add custom value
          </li>
        </ul>
      </li>
      <li>
           checkFunction: function(value, rules) // value param is the form element value and the rules param is the rule object<br/>
          // It must be use the next code, if the passing is false<br/>
      		<code>if (rules.passing === false) {
  					return rules.passing;
  				}</code>
        </li>
    </ul>
  </p>
</div>

<div>
<h3>
  Demo:
</h3>
<p>
  You find demo in the index.html file.
</p>
</div>
