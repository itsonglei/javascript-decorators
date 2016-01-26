import {
  FunctionMirror,
  ParameterMirror,
  ClassMirror
} from "../mirror";

type Realm = any;

export interface ExtendedFunctionMirror extends FunctionMirror {
  functionKind: string;

  thisMode: "lexical" | "strict" | "global";
  strict: boolean;
  realm: Realm;

  // replacement for inspection use-case of toString() semtantics
  sourceCode: string;

  // replacement for transport use-case of toString() semantics
  isPortable: boolean;
  portableSourceCode: string;

  evaluateArguments(thisArgument: any, argumentList: any[]): any[];
}

export interface NormalFunctionMirror extends ExtendedFunctionMirror {
  functionKind: "normal";
  toMethod(homeObject: typeof Object): MethodMirror;
}

export interface ExtendedClassMirror extends ClassMirror, ExtendedFunctionMirror {
  functionKind: "classConstructor";
  constructorKind: "base" | "derived";
}

export interface MethodMirror extends ExtendedFunctionMirror {
  functionKind: "method";
  homeObject: typeof Object;
}

export interface BoundFunctionMirror extends ExtendedFunctionMirror {
  isBound: boolean;

  boundTargetFunction: ExtendedFunctionMirror;
  boundThis: any;
  boundArguments: any[];
}


export interface ExtendedParameterMirror extends ParameterMirror {
  patternKind: "normal" | "default" | "rest";
}