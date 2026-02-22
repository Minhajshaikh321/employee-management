import time
# This middleware logs the incoming request method and path, as well as the time taken to process the request and the status code of the response.
class RequestTimeLoggingMiddleware:
    def __init__(self,get_response):
        # The __init__ method is called once when the middleware is initialized. It takes a get_response function as an argument, which is used to process the request and generate a response.
        self.get_response=get_response
    # This method is called for each incoming request. It logs the request method and path, processes the request, and then logs the time taken and status code of the response.
    def __call__(self,request):
        start_time=time.time()
        print(f"Incoming request mathod: {request.method},Path : {request.path}")

        # Process the request and get the response
        response=self.get_response(request)
        end_time=time.time()
        total_duration=end_time-start_time

        # Log the time taken to process the request and the status code of the response
        print(f'Request process time is {total_duration:.2f}s and status code is {response.status_code}')
        return response