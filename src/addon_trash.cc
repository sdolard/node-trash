#include <node.h>
#include <v8.h>

using namespace v8;

Handle<Value> Delete(const Arguments& args) {
    HandleScope scope;
    return scope.Close(String::New("delete"));
}

Handle<Value> DeleteSync(const Arguments& args) {
    HandleScope scope;

    // Args test
    if (args.Length() < 1) {
        ThrowException(Exception::TypeError(String::New("Wrong number of arguments")));
        return scope.Close(Undefined());
    }

    if (!args[0]->IsString()) {
        ThrowException(Exception::TypeError(String::New("Wrong arguments")));
        return scope.Close(Undefined());
    }

     Local<String> filePath = String::New(args[0]->StringValue());

    return scope.Close(String::New("deleteSync: " + filePath));
}

Handle<Value> Erase(const Arguments& args) {
    HandleScope scope;
    return scope.Close(String::New("erase"));
}

void init(Handle<Object> exports) {
    exports->Set(String::NewSymbol("delete"),
        FunctionTemplate::New(Delete)->GetFunction());
    exports->Set(String::NewSymbol("deleteSync"),
        FunctionTemplate::New(DeleteSync)->GetFunction());

    exports->Set(String::NewSymbol("erase"),
        FunctionTemplate::New(Erase)->GetFunction());
}

NODE_MODULE(addon_trash, init)
