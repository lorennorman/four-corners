require 'net/http'

class GamesController < ApplicationController
  def new
    # generate random id
    id = rand(5_000_000_000)
    # redirect to show
    redirect_to :action => :show, :id => id
  end

  def show
    game_id = params[:id]

    # ask bitly for a URL for it
    bitly_vars = {
      :login   => "lorennorman",
      :apiKey  => "R_a78797ac76c2092a7cec91f9868f3854",
      :longUrl => join_game_url(game_id)
    }
    querystring = bitly_vars.map { |k, v| "#{k}=#{v}" }.join "&"

    begin
      bitly_response = Net::HTTP.get(URI.parse("http://api.bit.ly/v3/shorten?#{querystring}"))
      bitly_object   = JSON.parse bitly_response
      bitly_url      = bitly_object["data"]["url"]
      @qrcode        = "#{bitly_url}.qrcode"
    rescue
      @qrcode = ""
    end
  end

  def join

  end
end
