class WelcomesController < ApplicationController
  def index
    render text: <<-BODY
    <script src="/faye.js"></script>
BODY
  end
end