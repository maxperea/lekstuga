var Student = function(name){
	this.name = name;
	this.sayHello = function(){
		console.log("Hej jag heter " + this.name)
	};
}

var UppsalaStudent = function(name, nation){
	Student.call(this, name);
	this.nation = nation;
	this.rapport = function(){
		console.log("Hej min nation är " + this.nation)
	};
}



UppsalaStudent.prototype = Object.create(Student.prototype);
UppsalaStudent.prototype.constructor = UppsalaStudent;

var student = new UppsalaStudent("Gustav", "Snerikes");


console.log(student instanceof Student);
console.log(student instanceof UppsalaStudent);

